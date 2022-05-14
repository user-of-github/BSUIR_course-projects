import {LoadingState} from '../LoadingState'
import {MovieShorten} from '../Movie'


export interface MoviesPageState {
    moviesCardsLoaded: Array<MovieShorten>
    loading: LoadingState
    showLoadMoreButton: boolean
}