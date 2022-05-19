import {LoadingState} from '../LoadingState'
import {MovieShorten} from '../Movie'


export interface SearchPageState {
    loading: LoadingState
    foundMovies: Array<MovieShorten>
}