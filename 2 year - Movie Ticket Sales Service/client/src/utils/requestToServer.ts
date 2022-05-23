import {RequestParameters, RequestParameters2} from '../types/RequestParameters'


export const requestToServer = (parameters: RequestParameters): XMLHttpRequest => {
    const request: XMLHttpRequest = new XMLHttpRequest()

    request.onload = function (): void {
        if (this.status < 400)
            parameters.callback(this.responseText, undefined)
        else
            parameters.callback(null, new Error(`Failed (error from requestToServer()): ${this.statusText}`))
    }

    request.open(parameters.method, parameters.url, true)

    parameters.contentType && request.setRequestHeader('Content-Type', parameters.contentType)

    request.send()

    return request
}


export const requestToServer2 = async (parameters: RequestParameters2): Promise<any> => {
    const response: Response = await fetch(parameters.url, {
        method: parameters.method,
        headers: parameters.headers,
        body: parameters.body
    })
    const data = await response.json()
    await parameters.callback(response, data)
}