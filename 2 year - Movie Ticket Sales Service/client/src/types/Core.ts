import {Movie, testMovies} from './Movie'

export class Core {
    private serverDomain: string = ''

    public Core() {
    }

    public getMovieById(id: string): Movie | null {
        const response: Movie | undefined = testMovies.find((movie: Movie) => movie.id === id)
        return response === undefined ? null : response
    }

    public getPopularMovies(): Array<Movie> {
        return testMovies.slice(0, 3)
    }

    public getMovies(from: number = 0, to: number = 8): Array<Movie> {
        return testMovies.slice(from, to)
    }
}