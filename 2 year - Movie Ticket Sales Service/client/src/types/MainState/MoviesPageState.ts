import {LoadingState} from '../LoadingState'
import {Movie} from '../Movie'


export interface MoviesPageState {
    cardsLoaded: Array<Movie>
    loading: LoadingState
    showLoadMoreButton: boolean
}