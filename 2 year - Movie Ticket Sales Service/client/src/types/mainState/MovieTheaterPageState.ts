import {MovieTheater} from '../MovieTheater'
import {LoadingState} from '../LoadingState'


export interface MovieTheaterPageState {
    loading: LoadingState
    theater: MovieTheater | null
}