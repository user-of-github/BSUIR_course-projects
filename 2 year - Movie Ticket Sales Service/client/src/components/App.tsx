import React from 'react'
import {MainPage} from '../pages/main/MainPage'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {ContactPage} from '../pages/contact/ContactPage'
import {MoviesPage} from '../pages/movies/MoviesPage'
import {MovieTheatersPage} from '../pages/movieTheaters/MovieTheatersPage'
import {Header} from './header/Header'
import {Container} from './layout/container/Container'
import {MoviePage} from '../pages/movie/MoviePage'
import {Core} from '../types/Core'


export const App = (): JSX.Element => {
    const appController: React.MutableRefObject<Core> = React.useRef(new Core())

    return (
        <Container>
            <Router>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<MainPage controller={appController.current}/>}/>
                    <Route path={'/contact'} element={<ContactPage/>}/>
                    <Route path={'/movies'} element={<MoviesPage controller={appController.current}/>}/>
                    <Route path={'/movie'} element={<MoviePage controller={appController.current}/>}/>
                    <Route path={'/movie-theaters'} element={<MovieTheatersPage controller={appController.current}/>}/>
                </Routes>

            </Router>
        </Container>
    )
}
