import {LoadingState} from '../LoadingState'
import {Movie} from '../Movie'


export interface MoviePageState {
    loading: LoadingState
    movie: Movie | null
}