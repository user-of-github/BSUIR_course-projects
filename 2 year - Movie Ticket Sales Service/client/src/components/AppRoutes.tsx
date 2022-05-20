import {observer} from 'mobx-react-lite'
import {NavigateFunction, Route, Routes, useNavigate} from 'react-router-dom'
import {Header} from './header/Header'
import {MainPage} from '../pages/main/MainPage'
import {ContactPage} from '../pages/contact/ContactPage'
import {MoviesPage} from '../pages/movies/MoviesPage'
import {MoviePage} from '../pages/movie/MoviePage'
import {MovieTheatersPage} from '../pages/movieTheaters/MovieTheatersPage'
import {MovieTheaterPage} from '../pages/movieTheaterPage/MovieTheaterPage'
import {SearchPage} from '../pages/search/SearchPage'
import {NotFoundDefaultPage} from '../pages/notFoundDefaultPage/NotFoundDefaultPage'
import React from 'react'
import {MainState} from '../types/mainState/MainState'
import {SignInPage} from '../pages/authorization/SignInPage'
import {LogInPage} from '../pages/authorization/LogInPage'


export const AppRoutes = observer(({mainState}: {mainState: MainState}): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()

    return (
        <>
            <Header callbackForSearch={(value: string) => {
                navigate(`/search-movie?query=${value}`)
                window.location.reload()
            }}/>
            <Routes>
                <Route path={'/'} element={<MainPage state={mainState}/>}/>
                <Route path={'/contact'} element={<ContactPage/>}/>
                <Route path={'/movies'} element={<MoviesPage state={mainState}/>}/>
                <Route path={'/movie'} element={<MoviePage state={mainState}/>}/>
                <Route path={'/movie-theaters'} element={<MovieTheatersPage state={mainState}/>}/>
                <Route path={'/movie-theater'} element={<MovieTheaterPage state={mainState}/>}/>
                <Route path={'/search-movie'} element={<SearchPage state={mainState}/>}/>
                <Route path={'/signin'} element={<SignInPage/>}/>
                <Route path={'/login'} element={<LogInPage/>}/>
                <Route path={'*'} element={<NotFoundDefaultPage/>}/>
            </Routes>
        </>
    )
})