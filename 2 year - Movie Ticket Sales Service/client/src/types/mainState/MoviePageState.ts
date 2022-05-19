import {LoadingState} from '../LoadingState'
import {Movie} from '../Movie'
import {MovieTheater} from '../MovieTheater'


export interface MoviePageState {
    loading: LoadingState
    movie: Movie | null
    theatersList: Array<MovieTheater>
}