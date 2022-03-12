import StylePages from '../Pages.module.css'
import {Movie} from '../../types/Movie'
import React from 'react'
import {Core} from '../../types/Core'
import {LoadingState} from '../../types/LoadingState'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'


export const MoviesPage = (props: { controller: Core }): JSX.Element => {
    const [loading, setLoading] = React.useState<LoadingState>(LoadingState.LOADING)
    const [movies, setMovies] = React.useState<Array<Movie>>([])

    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

        window.setTimeout((): void => {
            setMovies(props.controller.getMovies(0, 4))
            setLoading(LoadingState.LOADED)
        }, 2000)
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <MovieGrid loadingState={loading}
                           movies={movies}
                           styles={{gridRowGap: '30px'}}
                />
            </main>
        </div>
    )
}