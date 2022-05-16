import {LoadingState} from '../LoadingState'
import {MovieShorten} from '../Movie'
import {MovieTheater} from '../MovieTheater'


export interface MainPageState {
    popularMovies: {
        loading: LoadingState
        loadedPopularMovies: Array<MovieShorten>
    }
    popularMovieTheaters: {
        loading: LoadingState
        loadedPopularMovieTheaters: Array<MovieTheater>
    }
}