import React from 'react'
import {Promo} from '../../components/promo/Promo'
import StylePages from '../Pages.module.css'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'
import {MainState} from '../../types/mainState/MainState'
import {observer} from 'mobx-react-lite'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import {MovieTheatersList} from '../../components/movieTheatersList/MovieTheatersList'
import {Button, ButtonType} from '../../components/UI/button/Button'
import {Link} from 'react-router-dom'


export const MainPage = observer((props: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        props.state.loadPopularMovies()
        props.state.loadPopularTheaters()
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <Promo/>

                <h2 style={{...DEFAULT_H2_PAGE_TITLE, marginTop: '30px'}}>
                    Frequently viewed movies
                    <Link to={'/movies'}>
                        <Button text={'See all'} styles={{marginLeft: '10px'}} type={ButtonType.BUTTON_PRIMARY_FILLED}/>
                    </Link>
                </h2>

                {
                    props.state.mainPageState.popularMovies.loading === LoadingState.LOADING
                        ? <Loading/>
                        :
                        <MovieGrid movies={props.state.mainPageState.popularMovies.loadedPopularMovies}
                                   styles={{marginTop: '40px'}}/>
                }

                <h2 style={{...DEFAULT_H2_PAGE_TITLE, marginTop: '50px'}}>
                    Suggested movie theaters
                    <Link to={'/movie-theaters'}>
                        <Button text={'See all'} styles={{marginLeft: '10px'}} type={ButtonType.BUTTON_PRIMARY_FILLED}/>
                    </Link>
                </h2>

                {
                    props.state.mainPageState.popularMovieTheaters.loading === LoadingState.LOADING
                        ? <Loading/>
                        :
                        <MovieTheatersList styles={{marginTop: '30px'}}
                                           cinemas={props.state.mainPageState.popularMovieTheaters.loadedPopularMovieTheaters}
                        />
                }

            </main>
        </div>
    )
})