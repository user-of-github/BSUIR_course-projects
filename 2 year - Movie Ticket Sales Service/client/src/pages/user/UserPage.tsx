import {observer} from 'mobx-react-lite'
import {MainState} from '../../types/mainState/MainState'
import {Navigate} from 'react-router-dom'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import React from 'react'
import { MovieGrid } from '../../components/movieGrid/MovieGrid'


export const UserPage = observer(({state}: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        state.getUsersFavourites()
    }, [])

    if (state.user === null) return <Navigate to="/login"/>

    return (
        <>
            <h2 style={{...DEFAULT_H2_PAGE_TITLE, color: 'var(--accent-main)'}}>
                Welcome, <ins>{state.user.serverData.username} !</ins>
            </h2>
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