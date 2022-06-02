import {observer} from 'mobx-react-lite'
import {NavigateFunction, Route, Routes, useNavigate} from 'react-router-dom'
import {Header} from './header/Header'
import {MainPage} from '../pages/main/MainPage'
import {ContactPage} from '../pages/contact/ContactPage'
import {MoviesPage} from '../pages/movies/MoviesPage'
import {MoviePage} from '../pages/movie/MoviePage'
import {MovieTheatersPage} from '../pages/movieTheaters/MovieTheatersPage'
import {MovieTheaterPage} from '../pages/movieTheater/MovieTheaterPage'
import {SearchPage} from '../pages/search/SearchPage'
import {NotFoundDefaultPage} from '../pages/notFoundDefault/NotFoundDefaultPage'
import React from 'react'
import {MainState} from '../types/mainState/MainState'
import {SignInPage} from '../pages/authorization/SignInPage'
import {UserPage} from '../pages/user/UserPage'
import {LogInPage} from '../pages/authorization/LogInPage'
import {HistoryOfActions} from '../pages/actionsHistory/HistoryOfActions'


export const AppRoutes = observer(({mainState}: {mainState: MainState}): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()

    const callbackForSearch = (value: string): void => {
        navigate(`/search-movie?query=${value}`)
        window.location.reload()
    }

    return (
        <>
            <Header callbackForSearch={callbackForSearch} state={mainState}/>
            <Routes>
                <Route path={'/'} element={<MainPage state={mainState}/>}/>
                <Route path={'/contact'} element={<ContactPage/>}/>
                <Route path={'/movies'} element={<MoviesPage state={mainState}/>}/>
                <Route path={'/movie'} element={<MoviePage state={mainState}/>}/>
                <Route path={'/movie-theaters'} element={<MovieTheatersPage state={mainState}/>}/>
                <Route path={'/movie-theater'} element={<MovieTheaterPage state={mainState}/>}/>
                <Route path={'/search-movie'} element={<SearchPage state={mainState}/>}/>
                <Route path={'/signin'} element={<SignInPage state={mainState}/>}/>
                <Route path={'/login'} element={<LogInPage state={mainState}/>}/>
                <Route path={'/account'} element={<UserPage state={mainState}/>}/>
                <Route path={'/history'} element={<HistoryOfActions state={mainState}/> }/>
                <Route path={'*'} element={<NotFoundDefaultPage/>}/>
            </Routes>
        </>
    )
})