import {makeAutoObservable} from 'mobx'
import {MoviesServiceCore} from '../core/MoviesServiceCore'
import {MoviesPageState} from './MoviesPageState'
import {LoadingState} from '../LoadingState'
import {RequestCallback} from '../RequestCallback'
import {
    ServerResponseForFullMovie,
    ServerResponseForMoviesForTheater,
    ServerResponseForMoviesList,
    ServerResponseForMoviesSearch,
    ServerResponseForMovieTheater,
    ServerResponseForTheatersList
} from '../ServerResponse'
import {MainPageState} from './MainPageState'
import {MoviePageState} from './MoviePageState'
import {MovieTheatersPageState} from './MovieTheatersPageState'
import {MovieTheaterPageState} from './MovieTheaterPageState'
import {SearchPageState} from './SearchPageState'
import jwtDecode from 'jwt-decode'
import {User} from '../User'
import {UserPageState} from './UserPageState'
import {HistoryPageState} from './HistoryPageState'
import {LOCAL_SERVER_URL, SERVER_URL} from '../../configuration'



export class MainState {
    private static readonly HOW_MANY_TO_LOAD: number = 4
    private static readonly LOCAL_STORAGE_JWT_KEY: string = 'authTokens'
    private static readonly ASKING_FOR_RELOGIN: string = 'It seems, that your authorization time ended. Please login again'
    private static readonly REFRESH_TOKEN_INTERVAL: number = 1000 * 60 * 4

    public readonly controller: MoviesServiceCore

    public readonly moviesPageState: MoviesPageState
    public readonly mainPageState: MainPageState
    public readonly moviePageState: MoviePageState
    public readonly movieTheatersPageState: MovieTheatersPageState
    public readonly movieTheaterPageState: MovieTheaterPageState
    public readonly searchPageState: SearchPageState
    public readonly userPageState: UserPageState
    public readonly usersHistoryPageState: HistoryPageState

    public user: User | null

    private readonly refreshTokenIntervalID: number


    public constructor(production: boolean = false) {
        this.controller = new MoviesServiceCore(production ? SERVER_URL : LOCAL_SERVER_URL)

        this.moviesPageState = {moviesCardsLoaded: [], loading: LoadingState.LOADING, showLoadMoreButton: true}
        this.mainPageState = {
            popularMovies: {loadedPopularMovies: [], loading: LoadingState.LOADING},
            popularMovieTheaters: {loadedPopularMovieTheaters: [], loading: LoadingState.LOADING}
        }
        this.moviePageState = {loading: LoadingState.LOADING, movie: null, theatersList: [], isFavourite: false, comments: []}
        this.movieTheatersPageState = {loading: LoadingState.LOADING, movieTheatersLoaded: []}
        this.movieTheaterPageState = {loading: LoadingState.LOADING, theater: null}
        this.searchPageState = {loading: LoadingState.LOADING, foundMovies: []}
        this.userPageState = {favourites: []}
        this.usersHistoryPageState = {loading: LoadingState.LOADING, notifications: []}

        this.user = null

        this.checkLogIn()

        this.refreshTokenIntervalID = window.setInterval((): void => {
            this.user !== null && this.updateToken()
        }, MainState.REFRESH_TOKEN_INTERVAL)

        makeAutoObservable(this, {}, {deep: true})
    }

    public loadMoreMovies(howMany: number = MainState.HOW_MANY_TO_LOAD): void {
        this.moviesPageState.loading = LoadingState.LOADING

        const currentLoadedTo: number = this.moviesPageState.moviesCardsLoaded.length
        const newLoadedTo: number = currentLoadedTo + howMany - 1

        const onMoviesLoad: RequestCallback = (data, error) => {
            this.moviesPageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForMoviesList = JSON.parse(data!)

            if (parsedResponse.success) {
                this.moviesPageState.moviesCardsLoaded.push(...Array.from(parsedResponse.data || []))
                this.moviesPageState.showLoadMoreButton = parsedResponse.howManyLeft !== 0
            } else {
                throw new Error(`Something went wrong. Error from server: ${parsedResponse.status}`)
            }
        }

        this.controller.getMovies(onMoviesLoad, currentLoadedTo, newLoadedTo)
    }

    public loadPopularMovies(): void {
        const onPopularMoviesLoad: RequestCallback = (data, error) => {
            this.mainPageState.popularMovies.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForMoviesList = JSON.parse(data!)

            this.mainPageState.popularMovies.loadedPopularMovies = Array.from(parsedResponse.data as [])
        }

        this.controller.getPopularMovies(onPopularMoviesLoad)
    }

    public loadPopularTheaters(): void {
        const onPopularTheaterLoad: RequestCallback = (data, error) => {
            this.mainPageState.popularMovieTheaters.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForTheatersList = JSON.parse(data!)

            this.mainPageState.popularMovieTheaters.loadedPopularMovieTheaters = parsedResponse.data
        }

        this.controller.getPopularTheaters(onPopularTheaterLoad)
    }

    public loadMovie(id: string): void {
        this.moviePageState.loading = LoadingState.LOADING

        const onMovieLoad: RequestCallback = (data, error) => {
            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForFullMovie = JSON.parse(data!)

            if (parsedResponse.success) {
                this.moviePageState.movie = parsedResponse.data
                this.loadTheatersForMovie(id)
                this.checkIfInFavourite(id)
                this.getCommentsForMovie(parsedResponse!.data!.comments as [])
            } else {
                this.moviePageState.loading = LoadingState.LOADING
                this.moviePageState.movie = null
            }
        }

        this.controller.getMovieById(id, onMovieLoad)
    }

    public loadMovieTheatersList(): void {
        const onTheatersLoad: RequestCallback = (data: string | null, error: Error | undefined) => {
            this.movieTheatersPageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForMoviesList = JSON.parse(data!)

            //console.log(parsedResponse)

            this.movieTheatersPageState.movieTheatersLoaded = Array.from(parsedResponse.data as [])
        }

        this.controller.getMovieTheaters(onTheatersLoad)
    }

    public loadMovieTheater(title: string): void {
        this.movieTheaterPageState.loading = LoadingState.LOADING

        const onTheaterLoad: RequestCallback = (data, error) => {
            this.movieTheaterPageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForMovieTheater = JSON.parse(data!)

            if (parsedResponse.success) {
                this.movieTheaterPageState.theater = parsedResponse.data
                this.loadMoviesForTheater(parsedResponse.data.movies as [])
            } else
                this.movieTheaterPageState.theater = null
        }

        this.controller.getMovieTheaterByTitle(title, onTheaterLoad)
    }

    public loadMoviesForTheater(movies: Array<string>): void {
        const onTheaterLoad: RequestCallback = (data, error) => {
            this.movieTheaterPageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForMoviesForTheater = JSON.parse(data!)

            this.movieTheaterPageState.theater!.movies = parsedResponse.data
        }

        this.controller.getMoviesForTheater(movies, onTheaterLoad)
    }

    public loadTheatersForMovie(movieId: string): void {
        const onTheatersLoad: RequestCallback = (data, error) => {
            this.moviePageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForTheatersList = JSON.parse(data!)

            this.moviePageState.theatersList = parsedResponse.data as []
        }

        this.controller.getTheatersForMovie(movieId, onTheatersLoad)
    }

    public searchByQuery(query: string): void {
        this.searchPageState.loading = LoadingState.LOADING

        const onMoviesSearchLoad: RequestCallback = (data, error) => {
            this.searchPageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForMoviesSearch = JSON.parse(data!)

            this.searchPageState.foundMovies = parsedResponse.data as []
        }

        this.controller.searchMovies(query, onMoviesSearchLoad)
    }

    public authorize(username: string, password: string): void {
        const onAuthorizationCheckPassed = (response: Response, data: any, error: Error | null) => {
            if (error) throw new Error(error.message)

            if (response.status === 200)
                this.setUpLoggedInUser(data)
            else
                window.alert(response.statusText)
        }
        this.controller.authorize(username, password, onAuthorizationCheckPassed)
    }

    private setUpLoggedInUser(data: any): void {
        const decoded = jwtDecode(data.access)

        this.user = {serverData: decoded, access: data.access, refresh: data.refresh}

        localStorage.setItem(MainState.LOCAL_STORAGE_JWT_KEY, JSON.stringify(data))
    }

    public logOut(): void {
        this.user = null
        localStorage.removeItem(MainState.LOCAL_STORAGE_JWT_KEY)
    }

    private checkLogIn(): void {
        const storedLocally: any = JSON.parse(localStorage.getItem(MainState.LOCAL_STORAGE_JWT_KEY) || 'null')
        if (storedLocally !== null)
            this.user = {
                serverData: jwtDecode(storedLocally.access),
                access: storedLocally.access,
                refresh: storedLocally.access
            }
    }

    private updateToken(): void {
        const onUpdatePassed = (response: Response, data: any, error: Error | null) => {
            if (error) throw new Error(error.message)

            if (response.status === 200) {
                this.setUpLoggedInUser(data)
            } else {
                //window.alert('Something went wrong')
                this.logOut()
            }
        }

        this.user !== null && this.controller.refreshToken(this.user.refresh, onUpdatePassed)
    }

    public register(username: string, password: string, email: string): void {
        const onRegistrationTryPassed = (response: Response, data: any, error: Error | null) => {
            if (error) throw new Error(error.message)
            window.alert(`Django's response: ${response.statusText}`)
        }

        const formData: FormData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('email', email)

        this.controller.register(formData, onRegistrationTryPassed)
    }

    public addOrRemoveMovieToFavourite(movieId: string, add: boolean = true): void {
        if (add) {
            const onAddingTryPassed = (response: Response, data: any, error: Error | null) => {
                if (error) throw new Error(error.message)
                //window.alert(data.status)
                window.location.reload()
            }

            if (this.user !== null)
                this.controller.addToFavourites(movieId, this.user.access, onAddingTryPassed)
            else
                window.alert('Unable. Unauthorized !')
        } else { // => to remove
            const onRemovingTryPassed = (response: Response, data: any, error: Error | null) => {
                if (error) throw new Error(error.message)
                //window.alert(data.status)
                window.location.reload()
            }

            if (this.user !== null)
                this.controller.removeFromFavourites(movieId, this.user.access, onRemovingTryPassed)
            else
                window.alert('Unable. Unauthorized !')
        }
    }

    public getUsersFavourites(): void {
        const onGettingFavourites = (response: Response, data: any, error: Error | null) => {
            if (error) throw new Error(error.message)
            if (response.status < 400) {
                this.userPageState.favourites = data.data
            } else {
                window.alert(MainState.ASKING_FOR_RELOGIN)
                this.logOut()
            }
        }

        if (this.user !== null)
            this.controller.getFavourites(this.user.access, onGettingFavourites)
        else
            window.alert('Unable. Unauthorized !')
    }

    public checkIfInFavourite(movieId: string): void {
        const onCheckPass = (response: Response, data: any, error: Error | null) => {
            if (error) throw new Error(error.message)
            this.moviePageState.isFavourite = data.result === true
        }

        if (this.user !== null)
            this.controller.checkIfFavourite(movieId, this.user.access, onCheckPass)
    }

    public addComment(movieId: string, comment: string): void {
        const onAddPass = (response: Response, data: any, error: Error | null) => {
            if (error) throw new Error(error.message)
            window.location.reload()
        }

        if (this.user !== null)
            this.controller.sendComment(movieId, comment, this.user.access, onAddPass)
    }

    public getCommentsForMovie(ids: Array<string>): void {
        const onCommentsLoad: RequestCallback = (data, error) => {
            this.movieTheaterPageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForMoviesForTheater = JSON.parse(data!)

            this.moviePageState!.comments! = parsedResponse.data as []
        }

        this.controller.getCommentsById(ids, onCommentsLoad)
    }

    public getUsersNotifications(): void {
        const onLoad = (response: Response, data: any, error: Error | null) => {
            if (error) throw new Error(error.message)
            this.usersHistoryPageState.loading = LoadingState.LOADED
            if (response.status < 400) {
                this.usersHistoryPageState.notifications = data.data
            }
            else {
                if (response.status === 401) {
                    window.alert(MainState.ASKING_FOR_RELOGIN)
                    this.logOut()
                }
            }
        }

        if (this.user !== null)
            this.controller.getUserHistory(this.user.access, onLoad)
    }
}