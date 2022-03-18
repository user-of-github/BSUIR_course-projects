import {requestToServer} from "../utils/requestToServer";


export class Core {
    private serverDomain: string = 'http://0.0.0.0:8000/'
    private getMovieRoute: string = 'movie-id'
    private getAllMoviesRoute: string = 'movies'


    public getMovieById(id: string, callback: any): void {
        const fullUrl: string = `${this.serverDomain}${this.getMovieRoute}=${id}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getPopularMovies(callback: any): void {
        const fullUrl: string = `${this.serverDomain}${this.getAllMoviesRoute}/${0}/${3}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }

    public getMovies(callback: any, from: number = 0, to: number = 8): void {
        const fullUrl: string = `${this.serverDomain}${this.getAllMoviesRoute}/${from}/${to}`
        requestToServer({url: fullUrl, method: 'GET', callback: callback})
    }
}