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


export class MainState {
    private static readonly HOW_MANY_TO_LOAD: number = 4
    private static readonly LOCAL_STORAGE_JWT_KEY: string = 'authTokens'
    private static readonly REFRESH_TOKEN_INTERVAL: number = 1000 * 60 * 4

    public readonly controller: MoviesServiceCore

    public readonly moviesPageState: MoviesPageState
    public readonly mainPageState: MainPageState
    public readonly moviePageState: MoviePageState
    public readonly movieTheatersPageState: MovieTheatersPageState
    public readonly movieTheaterPageState: MovieTheaterPageState
    public readonly searchPageState: SearchPageState

    public user: User | null

    private readonly refreshTokenIntervalID: number


    public constructor() {
        this.controller = new MoviesServiceCore()

        this.moviesPageState = {moviesCardsLoaded: [], loading: LoadingState.LOADING, showLoadMoreButton: true}
        this.mainPageState = {
            popularMovies: {loadedPopularMovies: [], loading: LoadingState.LOADING},
            popularMovieTheaters: {loadedPopularMovieTheaters: [], loading: LoadingState.LOADING}
        }
        this.moviePageState = {loading: LoadingState.LOADING, movie: null, theatersList: []}
        this.movieTheatersPageState = {loading: LoadingState.LOADING, movieTheatersLoaded: []}
        this.movieTheaterPageState = {loading: LoadingState.LOADING, theater: null}
        this.searchPageState = {loading: LoadingState.LOADING, foundMovies: []}

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

            console.log(parsedResponse)

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
                window.alert('Something went wrong')
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

    private async updateToken(): Promise<any> {
        const onUpdatePassed = (response: Response, data: any, error: Error | null) => {
            if (error) throw new Error(error.message)

            if (response.status === 200) {
                this.setUpLoggedInUser(data)
            } else {
                window.alert('Something went wrong')
                this.logOut()
            }
        }

        this.user !== null && this.controller.refreshToken(this.user.refresh, onUpdatePassed)
    }
}