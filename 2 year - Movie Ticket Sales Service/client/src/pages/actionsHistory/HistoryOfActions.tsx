import {observer} from 'mobx-react-lite'
import {MainState} from '../../types/mainState/MainState'
import StylePages from '../Pages.module.css'
import React from 'react'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {NotificationsList} from '../../components/notification/NotificationsList'
import {Navigate} from 'react-router-dom'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'

export const HistoryOfActions = observer(({state}: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        state.getUsersNotifications()
    }, [])

    if (state.user === null) return <Navigate to="/login"/>

    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <h2 style={DEFAULT_H2_PAGE_TITLE}>Recent actions: </h2>
                <br/>
                {
                    state.usersHistoryPageState.loading === LoadingState.LOADING
                        ?
                        <Loading/>
                        :
                        <NotificationsList list={state.usersHistoryPageState.notifications}/>
                }
            </main>
        </div>
    )
})