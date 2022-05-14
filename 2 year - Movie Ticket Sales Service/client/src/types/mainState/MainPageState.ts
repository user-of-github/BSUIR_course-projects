import {LoadingState} from '../LoadingState'
import {MovieShorten} from '../Movie'


export interface MainPageState {
    loading: LoadingState
    loadedPopularMovies: Array<MovieShorten>
}