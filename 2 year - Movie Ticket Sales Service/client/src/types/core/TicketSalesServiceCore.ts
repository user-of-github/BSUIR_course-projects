import {requestToServer} from '../../utils/requestToServer'


export class TicketSalesServiceCore {
    private static readonly DEFAULT_SERVER_DOMAIN: string = 'http://0.0.0.0:8000/'
    private static readonly SINGLE_MOVIE_ROUTE: string = 'movies/id'
    private static readonly MOVIES_LIST_ROUTE: string = 'movies'
    private static readonly POPULAR_MOVIES_LIST_ROUTE: string = 'popular/movies'

    private readonly serverDomain: string


    public constructor(serverDomain: string = TicketSalesServiceCore.DEFAULT_SERVER_DOMAIN) {
        this.serverDomain = serverDomain
    }

    public getMovieById(id: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${TicketSalesServiceCore.SINGLE_MOVIE_ROUTE}=${id}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getPopularMovies(callback: any): void {
        const fullUrl: string = `${this.serverDomain}${TicketSalesServiceCore.POPULAR_MOVIES_LIST_ROUTE}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getMovies(callback: any, from: number, to: number): void {
        const fullUrl: string = `${this.serverDomain}${TicketSalesServiceCore.MOVIES_LIST_ROUTE}/${from}/${to}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }
}