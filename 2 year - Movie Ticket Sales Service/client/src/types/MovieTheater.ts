import {Movie, MovieShorten} from './Movie'


export interface MovieTheater {
    title: string
    address: string
    location: string
    photo: string
    movies: Array<MovieShorten>
}