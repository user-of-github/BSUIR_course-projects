import {RequestCallback} from './RequestCallback'


export interface RequestParameters {
    url: string
    callback: RequestCallback
    method: 'GET' | 'POST'
    contentType?: string
    body?: any
}

export interface RequestParameters2 {
    url: string
    callback: any
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    headers: any
    body: any
}