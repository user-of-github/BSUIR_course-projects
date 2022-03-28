import {makeAutoObservable} from 'mobx'
import {TicketSalesServiceCore} from '../core/TicketSalesServiceCore'
import {MoviesPageState} from './MoviesPageState'
import {LoadingState} from '../LoadingState'
import {RequestCallback} from '../RequestCallback'
import {ServerResponse} from '../ServerResponse'
import {MainPageState} from './MainPageState'
import {MoviePageState} from './MoviePageState'


export class MainState {
    private static readonly HOW_MANY_TO_LOAD: number = 4

    public readonly controller: TicketSalesServiceCore
    public readonly moviesPageState: MoviesPageState
    public readonly mainPageState: MainPageState
    public readonly moviePageState: MoviePageState


    public constructor() {
        this.controller = new TicketSalesServiceCore()

        this.moviesPageState = {cardsLoaded: [], loading: LoadingState.LOADING, showLoadMoreButton: true}
        this.mainPageState = {loadedPopularMovies: [], loading: LoadingState.LOADING}
        this.moviePageState = {loading: LoadingState.LOADING, movie: null}

        makeAutoObservable(this, {}, {deep: true})
    }

    public loadMoreMovies(howMany: number = MainState.HOW_MANY_TO_LOAD): void {
        this.moviesPageState.loading = LoadingState.LOADING

        const currentLoadedTo: number = this.moviesPageState.cardsLoaded.length
        const newLoadedTo: number = currentLoadedTo + howMany - 1

        const onMoviesLoad: RequestCallback = (data, error) => {
            window.setTimeout(() => {
                this.moviesPageState.loading = LoadingState.LOADED

                if (error) throw new Error(error.message)

                const parsedResponse: ServerResponse = JSON.parse(data!)

                if (parsedResponse.success) {// @ts-ignore
                    this.moviesPageState.cardsLoaded.push(...Array.from(parsedResponse.data.movies))
                    // @ts-ignore
                    this.moviesPageState.showLoadMoreButton = parsedResponse.data.howManyLeft !== 0
                } else {
                    throw new Error('Something went wrong (parsedResponse.success = false)')
                }
            }, 3000)
        }

        this.controller.getMovies(onMoviesLoad, currentLoadedTo, newLoadedTo)
    }


    public loadPopular(): void {
        if (this.mainPageState.loading === LoadingState.LOADED) return

        const onPopularMoviesLoad: RequestCallback = (data, error) => {
            this.mainPageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponse = JSON.parse(data!)

            if (parsedResponse.success) // @ts-ignore
                this.mainPageState.loadedPopularMovies = Array.from(parsedResponse.data)
            else
                throw new Error('Something went wrong (parsedResponse.success = false)')
        }

        this.controller.getPopularMovies(onPopularMoviesLoad)
    }

    public loadMovie(id: string): void {
        this.moviePageState.loading = LoadingState.LOADING

        const onMovieLoad: RequestCallback = (data, error) => {
            this.moviePageState.loading = LoadingState.LOADED

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponse = JSON.parse(data!)

            if (parsedResponse.success) // @ts-ignore
                this.moviePageState.movie = JSON.parse(parsedResponse.data)
            else
                throw new Error('Something went wrong (parsedResponse.success = false)')
        }

        this.controller.getMovieById(id, onMovieLoad)
    }
}