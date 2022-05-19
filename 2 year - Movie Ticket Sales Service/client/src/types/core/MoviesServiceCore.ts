import {requestToServer} from '../../utils/requestToServer'


export class MoviesServiceCore {
    private static readonly DEFAULT_SERVER_DOMAIN: string = 'http://127.0.0.1:8000/api/'
    private static readonly SINGLE_MOVIE_ROUTE: string = 'movie'
    private static readonly MOVIES_LIST_ROUTE: string = 'movies'
    private static readonly POPULAR_MOVIES_LIST_ROUTE: string = 'movies/popular'
    private static readonly MOVIE_THEATERS_LIST_ROUTE: string = 'movietheaters'
    private static readonly POPULAR_MOVIE_THEATERS: string = 'movietheaters/popular'
    private static readonly LIST_OF_MOVIES_BY_IDS: string = 'movies/getmovieslistbyids/?ids='
    private static readonly THEATERS_FOR_EXACT_MOVIE: string = 'theatersformovie/'
    private static readonly SEARCH_MOVIES: string = 'searchmovie/'

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

    public getPopularTheaters(callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.POPULAR_MOVIE_THEATERS}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getMovies(callback: any, from: number, to: number): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.MOVIES_LIST_ROUTE}/${from}/${to}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getMovieTheaters(callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.MOVIE_THEATERS_LIST_ROUTE}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getMovieTheaterByTitle(title: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.MOVIE_THEATERS_LIST_ROUTE}/${title}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getMoviesForTheater(ids: Array<string>, callback: any): void {
        const ids_string: string = ids.join(',')
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.LIST_OF_MOVIES_BY_IDS}${ids_string}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback, body: ids})
    }

    public getTheatersForMovie(movieId: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.THEATERS_FOR_EXACT_MOVIE}${movieId}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public searchMovies(query: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.SEARCH_MOVIES}${query}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }
}