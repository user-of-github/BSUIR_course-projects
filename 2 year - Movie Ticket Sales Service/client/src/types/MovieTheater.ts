import {Movie, MovieShorten} from './Movie'


export interface MovieTheater {
    title: string
    address: string
    location: string
    telephone: string
    photo: string
    movies: Array<MovieShorten>
}