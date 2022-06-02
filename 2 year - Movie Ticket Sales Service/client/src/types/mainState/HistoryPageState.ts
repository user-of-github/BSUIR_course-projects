import {LoadingState} from '../LoadingState'


export interface NotificationItem {
    message: string
}

export interface HistoryPageState {
    loading: LoadingState
    notifications: Array<NotificationItem>
}