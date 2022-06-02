import {NotificationItem} from '../../types/mainState/HistoryPageState'
import {Notification} from './Notification'


export const NotificationsList = (props: { list: Array<NotificationItem> }): JSX.Element => (
    <>
        {
            props.list.map((notification: NotificationItem, index: number): JSX.Element => (
                <Notification message={notification}
                              key={`${index}${notification.message}`}
                />
            ))
        }
    </>
)