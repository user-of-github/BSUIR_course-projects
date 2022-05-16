import {makeAutoObservable} from 'mobx'
import {MoviesServiceCore} from '../core/MoviesServiceCore'
import {MoviesPageState} from './MoviesPageState'
import {LoadingState} from '../LoadingState'
import {RequestCallback} from '../RequestCallback'
import {
    ServerResponseForFullMovie,
    ServerResponseForMoviesList,
    ServerResponseForMovieTheater,
    ServerResponseForTheatersList
} from '../ServerResponse'
import {MainPageState} from './MainPageState'
import {MoviePageState} from './MoviePageState'
import {MovieTheatersPageState} from './MovieTheatersPageState'
import {MovieTheaterPageState} from './MovieTheaterPageState'


export class MainState {
    private static readonly HOW_MANY_TO_LOAD: number = 4

    public readonly controller: MoviesServiceCore
    public readonly moviesPageState: MoviesPageState
    public readonly mainPageState: MainPageState
    public readonly moviePageState: MoviePageState
    public readonly movieTheatersPageState: MovieTheatersPageState
    public readonly movieTheaterPageState: MovieTheaterPageState


    public constructor() {
        this.controller = new MoviesServiceCore()

        this.moviesPageState = {moviesCardsLoaded: [], loading: LoadingState.LOADING, showLoadMoreButton: true}
        this.mainPageState = {
            popularMovies: {loadedPopularMovies: [], loading: LoadingState.LOADING},
            popularMovieTheaters: {loadedPopularMovieTheaters: [], loading: LoadingState.LOADING}
        }
        this.moviePageState = {loading: LoadingState.LOADING, movie: null}
        this.movieTheatersPageState = {loading: LoadingState.LOADING, movieTheatersLoaded: []}
        this.movieTheaterPageState = {loading: LoadingState.LOADING, theater: null}

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
            this.moviePageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponseForFullMovie = JSON.parse(data!)

            if (parsedResponse.success)
                this.moviePageState.movie = parsedResponse.data
            else
                this.moviePageState.movie = null
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

            if (parsedResponse.success)
                this.movieTheaterPageState.theater = parsedResponse.data
            else
                this.movieTheaterPageState.theater = null
        }

        this.controller.getMovieTheaterByTitle(title, onTheaterLoad)
    }
}