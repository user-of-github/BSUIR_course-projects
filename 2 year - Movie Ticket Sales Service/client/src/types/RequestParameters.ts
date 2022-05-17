import {RequestCallback} from './RequestCallback'


export interface RequestParameters {
    url: string
    callback: RequestCallback
    method: 'GET' | 'POST'
    contentType?: string
    body?: any
}