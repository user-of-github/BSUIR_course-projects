import {NotificationItem} from '../../types/mainState/HistoryPageState'
import Style from './Notification.module.css'


export const Notification = ({message}: {message: NotificationItem}): JSX.Element => (
    <div className={Style.notification}>
        <div className={Style.bubble} />
        {message.message}
    </div>
)
