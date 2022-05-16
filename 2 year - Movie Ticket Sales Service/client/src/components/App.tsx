import React from 'react'
import {MainPage} from '../pages/main/MainPage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ContactPage} from '../pages/contact/ContactPage'
import {MoviesPage} from '../pages/movies/MoviesPage'
import {MovieTheatersPage} from '../pages/movieTheaters/MovieTheatersPage'
import {Header} from './header/Header'
import {Container} from './layout/container/Container'
import {MoviePage} from '../pages/movie/MoviePage'
import {MainState} from '../types/mainState/MainState'
import {NotFoundDefaultPage} from '../pages/notFoundDefaultPage/NotFoundDefaultPage'
import {MovieTheaterPage} from '../pages/movieTheaterPage/MovieTheaterPage'


export const App = (): JSX.Element => {
    const mainState: React.MutableRefObject<MainState> = React.useRef(new MainState())

    return (
        <Container>
            <Router>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<MainPage state={mainState.current}/>}/>
                    <Route path={'/contact'} element={<ContactPage/>}/>
                    <Route path={'/movies'} element={<MoviesPage state={mainState.current}/>}/>
                    <Route path={'/movie'} element={<MoviePage state={mainState.current}/>}/>
                    <Route path={'/movie-theaters'} element={<MovieTheatersPage state={mainState.current}/>}/>
                    <Route path={'/movie-theater'} element={<MovieTheaterPage state={mainState.current}/>}/>
                    <Route path={'*'} element={<NotFoundDefaultPage/>}/>
                </Routes>
            </Router>
        </Container>
    )
}
