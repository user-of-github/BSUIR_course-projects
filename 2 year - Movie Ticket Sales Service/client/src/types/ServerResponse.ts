import {Movie, MovieShorten} from './Movie'
import {MovieTheater} from './MovieTheater'


export interface ServerResponseForMoviesList {
    howManyLeft: number
    success: boolean
    data: Array<MovieShorten> | undefined | null
    status: string
}

export interface ServerResponseForFullMovie {
    success: boolean
    data: Movie | null
}

export interface ServerResponseForPopulars {
    data: Array<MovieShorten>
}

export interface ServerResponseForTheatersList {
    data: Array<MovieTheater>
}

export interface ServerResponseForMovieTheater {
    success: boolean
    data: MovieTheater
}

