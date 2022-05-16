import React from 'react'
import StylePages from '../Pages.module.css'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {MainState} from '../../types/mainState/MainState'
import {MovieInfoModule} from '../../components/movieInfoModule/MovieInfoModule'
import {observer} from 'mobx-react-lite'
import {NotFound} from '../../components/notFound/NotFound'


export const MoviePage = observer((props: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        const id: string = new URLSearchParams(window.location.search).get('id') || ''
        props.state.loadMovie(id)
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                {
                    props.state.moviePageState.loading === LoadingState.LOADING
                        ?
                        <Loading/>
                        :
                        props.state.moviePageState.movie === null
                            ?
                            <NotFound/>
                            :
                            <MovieInfoModule movie={props.state.moviePageState.movie!}/>
                }
            </main>
        </div>
    )
})