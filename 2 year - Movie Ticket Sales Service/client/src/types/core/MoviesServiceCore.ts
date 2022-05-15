import {requestToServer} from '../../utils/requestToServer'


export class MoviesServiceCore {
    private static readonly DEFAULT_SERVER_DOMAIN: string = 'http://127.0.0.1:8000/api/'
    private static readonly SINGLE_MOVIE_ROUTE: string = 'movie'
    private static readonly MOVIES_LIST_ROUTE: string = 'movies'
    private static readonly POPULAR_MOVIES_LIST_ROUTE: string = 'movies/popular'

    private readonly serverDomain: string


    public constructor(serverDomain: string = MoviesServiceCore.DEFAULT_SERVER_DOMAIN) {
        this.serverDomain = serverDomain
    }

    public getMovieById(id: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.SINGLE_MOVIE_ROUTE}/${id}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getPopularMovies(callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.POPULAR_MOVIES_LIST_ROUTE}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getMovies(callback: any, from: number, to: number): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.MOVIES_LIST_ROUTE}/${from}/${to}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getMovieTheaters(callback: any): void {

    }
}