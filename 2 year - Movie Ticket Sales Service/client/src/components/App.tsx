import React from 'react'
import {Main} from '../pages/main/Main'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import {Contact} from '../pages/contact/Contact'
import {Movies} from '../pages/movies/Movies'
import {MovieTheaters} from '../pages/movieTheaters/MovieTheaters'
import {Header} from './header/Header'
import {Container} from './layout/container/Container'


export const App = (): JSX.Element => (
    <Container>
        <Router>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/contact'} element={<Contact/>}/>
                <Route path={'/movies'} element={<Movies/>}/>
                <Route path={'/movie-theaters'} element={<MovieTheaters/>}/>
            </Routes>

        </Router>
    </Container>
)
