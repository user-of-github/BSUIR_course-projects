import {RequestParameters} from '../types/RequestParameters'


export const requestToServer = (parameters: RequestParameters): XMLHttpRequest => {
    const request: XMLHttpRequest = new XMLHttpRequest()

    request.onload = function (): void {
        if (this.status < 400)
            parameters.callback(this.responseText, undefined)
        else
            parameters.callback(null, new Error('Failed (error from requestToServer()): ' + this.statusText))
    }

    request.open(parameters.method, parameters.url, true)

    parameters.contentType && request.setRequestHeader('Content-Type', parameters.contentType)

    request.send()

    return request
}