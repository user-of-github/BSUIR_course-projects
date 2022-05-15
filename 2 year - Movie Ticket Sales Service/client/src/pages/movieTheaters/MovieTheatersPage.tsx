import Style from '../Pages.module.css'
import StylePages from '../Pages.module.css'
import React from 'react'
import {MainState} from '../../types/mainState/MainState'
import {MovieTheatersList} from '../../components/movieTheatersList/MovieTheatersList'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'


export const MovieTheatersPage = (props: { state: MainState }): JSX.Element => {
    React.useEffect((): void => window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }), [])

    return (
        <div className={Style.smoothLoading}>
            <main className={StylePages.main}>
                <h2 style={{
                    color: 'black',
                    fontSize: '30px',
                    marginTop: '50px',
                    textAlign: 'left',
                    marginRight: 'auto'
                }}>
                    All movie theaters:
                </h2>

                {
                    props.state.movieTheatersPagesState.loading === LoadingState.LOADING
                        ? <Loading/>
                        :
                        <MovieTheatersList cinemas={props.state.movieTheatersPagesState.movieTheatersLoaded}/>
                }
                <MovieTheatersList cinemas={props.state.movieTheatersPagesState.movieTheatersLoaded}/>
            </main>
        </div>
    )
}