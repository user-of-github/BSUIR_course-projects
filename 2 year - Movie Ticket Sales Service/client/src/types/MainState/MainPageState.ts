import {LoadingState} from '../LoadingState'
import {Movie} from '../Movie'


export interface MainPageState {
    loading: LoadingState
    loadedPopularMovies: Array<Movie>
}