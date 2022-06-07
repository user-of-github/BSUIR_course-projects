import {requestToServer, requestToServer2} from '../../utils/requestToServer'



export class MoviesServiceCore {
    private static readonly DEFAULT_SERVER_DOMAIN: string = 'https://marvel-dc-movies-service.herokuapp.com/api/'

    private static readonly SINGLE_MOVIE_ROUTE: string = 'movie'
    private static readonly MOVIES_LIST_ROUTE: string = 'movies'
    private static readonly POPULAR_MOVIES_LIST_ROUTE: string = 'movies/popular'
    private static readonly MOVIE_THEATERS_LIST_ROUTE: string = 'movietheaters'
    private static readonly POPULAR_MOVIE_THEATERS_ROUTE: string = 'movietheaters/popular'
    private static readonly LIST_OF_MOVIES_BY_IDS_ROUTE: string = 'movies/getmovieslistbyids/?ids='
    private static readonly THEATERS_FOR_EXACT_MOVIE: string = 'theatersformovie/'
    private static readonly SEARCH_MOVIES_ROUTE: string = 'searchmovie/'
    private static readonly TOKEN_AUTHORIZATION_ROUTE: string = 'token/'
    private static readonly TOKEN_REFRESH_ROUTE: string = 'token/refresh/'
    private static readonly REGISTER_ROUTE: string = 'register/'
    private static readonly ADD_TO_FAVOURITES_ROUTE: string = 'addfavourite/'
    private static readonly GET_FAVOURITES_ROUTE: string = 'getfavourites/'
    private static readonly CHECK_IF_FAVOURITE_ROUTE: string = 'checkiffavourite/'
    private static readonly REMOVE_FROM_FAVOURITE_ROUTE: string = 'removefromfavourite/'
    private static readonly ADD_COMMENT_ROUTE: string = 'addcomment/'
    private static readonly LIST_OF_COMMENTS_BY_IDS_ROUTE: string = 'comments/getcommentslistbyids/?ids='
    private static readonly LIST_OF_NOTIFICATIONS_ROUTE: string = 'getusersnotifications/'

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
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.POPULAR_MOVIE_THEATERS_ROUTE}/`
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
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.LIST_OF_MOVIES_BY_IDS_ROUTE}${ids_string}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback, body: ids})
    }

    public getTheatersForMovie(movieId: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.THEATERS_FOR_EXACT_MOVIE}${movieId}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public searchMovies(query: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.SEARCH_MOVIES_ROUTE}${query}/`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public authorize(username: string, password: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.TOKEN_AUTHORIZATION_ROUTE}`
        requestToServer2({
            url: fullUrl,
            method: 'POST',
            callback: callback,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password})
        })
    }

    public refreshToken(token: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.TOKEN_REFRESH_ROUTE}`
        requestToServer2({
            url: fullUrl,
            method: 'POST',
            callback: callback,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refresh: token})
        })
    }

    public register(formData: FormData, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.REGISTER_ROUTE}`
        requestToServer2({
            url: fullUrl,
            method: 'POST',
            callback: callback,
            headers: {},
            body: formData
        })
    }

    public addToFavourites(movieId: string, userToken: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.ADD_TO_FAVOURITES_ROUTE}${movieId}/`
        requestToServer2({
            url: fullUrl,
            method: 'PUT',
            callback: callback,
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
            body: null
        })
    }

    public getFavourites(userToken: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.GET_FAVOURITES_ROUTE}`
        requestToServer2({
            url: fullUrl,
            method: 'GET',
            callback: callback,
            headers: {'Authorization': `Bearer ${userToken}`},
            body: null
        })
    }

    public checkIfFavourite(movieId: string, userToken: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.CHECK_IF_FAVOURITE_ROUTE}${movieId}/`
        requestToServer2({
            url: fullUrl,
            method: 'GET',
            callback: callback,
            headers: {'Authorization': `Bearer ${userToken}`},
            body: null
        })
    }

    public removeFromFavourites(movieId: string, userToken: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.REMOVE_FROM_FAVOURITE_ROUTE}${movieId}/`
        requestToServer2({
            url: fullUrl,
            method: 'PUT',
            callback: callback,
            headers: {'Authorization': `Bearer ${userToken}`},
            body: null
        })
    }

    public sendComment(movieId: string, comment: string, userToken: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.ADD_COMMENT_ROUTE}${movieId}/`
        requestToServer2({
            url: fullUrl,
            method: 'POST',
            callback: callback,
            headers: {'Authorization': `Bearer ${userToken}`},
            body: comment
        })
    }

    public getCommentsById(ids: Array<string>, callback: any): void {
        const ids_string: string = ids.join(',')
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.LIST_OF_COMMENTS_BY_IDS_ROUTE}${ids_string}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback, body: ids})
    }

    public getUserHistory(userToken: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${MoviesServiceCore.LIST_OF_NOTIFICATIONS_ROUTE}`
        requestToServer2({
            url: fullUrl,
            method: 'GET',
            callback: callback,
            headers: {'Authorization': `Bearer ${userToken}`},
            body: null
        })
    }
}