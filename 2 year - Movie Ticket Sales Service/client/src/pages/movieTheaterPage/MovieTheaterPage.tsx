import {observer} from 'mobx-react-lite'
import React from 'react'
import StylePages from '../Pages.module.css'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {NotFound} from '../../components/notFound/NotFound'
import {MovieInfoModule} from '../../components/movieInfoModule/MovieInfoModule'
import {MainState} from '../../types/mainState/MainState'
import {MovieTheaterInfoModule} from '../../components/movieTheaterInfoModule/MovieTheaterInfoModule'


export const MovieTheaterPage = observer((props: {state: MainState}): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        const title: string = new URLSearchParams(window.location.search).get('cinema-name') || 'default-id-unknown'
        props.state.loadMovieTheater(title)
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                {
                    props.state.movieTheaterPageState.loading === LoadingState.LOADING
                        ?
                        <Loading/>
                        :
                        props.state.movieTheaterPageState.theater === null
                            ?
                            <NotFound/>
                            :
                            <MovieTheaterInfoModule theater={props.state.movieTheaterPageState.theater}/>
                }
            </main>
        </div>
    )
})