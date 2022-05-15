import {LoadingState} from '../LoadingState'
import {MovieTheater} from '../MovieTheater'


export interface MovieTheatersPageState {
    movieTheatersLoaded: Array<MovieTheater>
    loading: LoadingState
}