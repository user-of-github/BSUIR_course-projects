import {Promo} from '../../components/promo/Promo'
import StylePages from '../Pages.module.css'
import {Grid} from '../../components/layout/grid/Grid'
import {MovieCard} from '../../components/movieCard/MovieCard'
import {Movie} from '../../types/Movie'
import React from 'react'
import {Core} from '../../types/Core'
import {LoadingState} from '../../types/LoadingState'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'


export const MainPage = (props: { controller: Core }): JSX.Element => {
    const [popularMovies, setPopularMovies] = React.useState<Array<Movie>>([])
    const [loading, setLoading] = React.useState<LoadingState>(LoadingState.LOADING)

    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

        window.setTimeout((): void => {
            setPopularMovies(props.controller.getPopularMovies())
            setLoading(LoadingState.LOADED)
        }, 3000)
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <Promo/>

                <h2 style={{color: 'black', fontSize: '30px', marginTop: '50px'}}>
                    Popular today:
                </h2>

                <MovieGrid loadingState={loading}
                           movies={popularMovies}
                           styles={{marginTop: '30px'}}
                />
            </main>
        </div>
    )
}