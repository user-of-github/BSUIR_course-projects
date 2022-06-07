import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Container} from './layout/container/Container'
import {MainState} from '../types/mainState/MainState'
import {AppRoutes} from './AppRoutes'
import {PRODUCTION} from '../configuration'


export const App = (): JSX.Element => {
    const mainState: React.MutableRefObject<MainState> = React.useRef(new MainState(PRODUCTION))

    return (
        <Container>
            <Router>
                <AppRoutes mainState={mainState.current}/>
            </Router>
        </Container>
    )
}
