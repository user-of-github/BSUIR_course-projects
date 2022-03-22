import React from 'react'
import {MainPage} from '../pages/main/MainPage'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {ContactPage} from '../pages/contact/ContactPage'
import {MoviesPage} from '../pages/movies/MoviesPage'
import {MovieTheatersPage} from '../pages/movieTheaters/MovieTheatersPage'
import {Header} from './header/Header'
import {Container} from './layout/container/Container'
import {MoviePage} from '../pages/movie/MoviePage'
import {TicketSalesServiceCore} from '../types/TicketSalesServiceCore'
import {MainState} from '../types/MainState/MainState'


export const App = (): JSX.Element => {
    const appController: React.MutableRefObject<TicketSalesServiceCore> = React.useRef(new TicketSalesServiceCore())
    const mainState: React.MutableRefObject<MainState> = React.useRef(new MainState())

    return (
        <Container>
            <Router>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<MainPage state={mainState.current}/>}/>
                    <Route path={'/contact'} element={<ContactPage/>}/>
                    <Route path={'/movies'} element={<MoviesPage state={mainState.current}/>}/>
                    <Route path={'/movie'} element={<MoviePage controller={appController.current}/>}/>
                    <Route path={'/movie-theaters'} element={<MovieTheatersPage controller={appController.current}/>}/>
                </Routes>

            </Router>
        </Container>
    )
}
