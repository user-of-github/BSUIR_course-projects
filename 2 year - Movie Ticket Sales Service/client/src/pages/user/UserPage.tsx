import {observer} from 'mobx-react-lite'
import {MainState} from '../../types/mainState/MainState'
import {Link, Navigate} from 'react-router-dom'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import React from 'react'
import { MovieGrid } from '../../components/movieGrid/MovieGrid'
import {Button, ButtonStrokeType, ButtonType} from '../../components/UI/button/Button'


export const UserPage = observer(({state}: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        state.getUsersFavourites()
    }, [state])

    if (state.user === null) return <Navigate to="/login"/>

    return (
        <>
            <h2 style={{...DEFAULT_H2_PAGE_TITLE, color: 'var(--accent-main)'}}>
                Welcome, <ins>{state.user.serverData.username} !</ins>
            </h2>
            <br/>
            <br/>
            <Link to={'/history'} style={{marginRight: 5, marginLeft: 5}}>
                <Button text={'🔔 history of actions & notifications ←'}
                        type={ButtonType.BUTTON_PRIMARY}
                        strokeType={ButtonStrokeType.BUTTON_NO_STROKE}
                />
            </Link>

            <br/>
            <br/>
            <h2 style={{...DEFAULT_H2_PAGE_TITLE, fontWeight: 100}}>
                Your favourite movies list
            </h2>
            <br/>
            <MovieGrid movies={state.userPageState.favourites}
                       styles={{gridTemplateColumns: 'repeat(5, 1fr)'}}
            />
        </>
    )
})