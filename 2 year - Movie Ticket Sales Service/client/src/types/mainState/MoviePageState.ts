import {LoadingState} from '../LoadingState'
import {Movie} from '../Movie'
import {MovieTheater} from '../MovieTheater'
import {Comment} from '../Comment'


export interface MoviePageState {
    loading: LoadingState
    movie: Movie | null
    theatersList: Array<MovieTheater>
    isFavourite: boolean
    comments: Array<Comment>
}