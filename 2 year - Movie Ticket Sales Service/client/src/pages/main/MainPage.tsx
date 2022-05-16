import React from 'react'
import {Promo} from '../../components/promo/Promo'
import StylePages from '../Pages.module.css'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'
import {MainState} from '../../types/mainState/MainState'
import {observer} from 'mobx-react-lite'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const MainPage = observer((props: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        props.state.loadPopular()
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <Promo/>

                <h2 style={{...DEFAULT_H2_PAGE_TITLE, marginTop: "30px"}}>Frequently viewed movies</h2>

                {
                    props.state.mainPageState.loading === LoadingState.LOADING
                        ? <Loading/>
                        :
                        <MovieGrid movies={props.state.mainPageState.loadedPopularMovies} styles={{marginTop: '40px'}}/>
                }
            </main>
        </div>
    )
})