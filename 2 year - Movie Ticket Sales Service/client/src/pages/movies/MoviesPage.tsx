import StylePages from '../Pages.module.css'
import {Movie} from '../../types/Movie'
import React from 'react'
import {Core} from '../../types/Core'
import {LoadingState} from '../../types/LoadingState'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'
import {ServerResponse} from "../../types/ServerResponse";
import {RequestCallback} from "../../types/RequestCallback";


export const MoviesPage = (props: { controller: Core }): JSX.Element => {
    const [loading, setLoading] = React.useState<LoadingState>(LoadingState.LOADING)
    const [movies, setMovies] = React.useState<Array<Movie>>([])

    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

        const onMoviesLoad: RequestCallback = (data, error) => {
            setLoading(LoadingState.LOADED)

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponse = JSON.parse(data!)

            if (parsedResponse.success)  // @ts-ignore
                setMovies(Array.from(parsedResponse.data))
            else
                setMovies([])
        }

        props.controller.getMovies(onMoviesLoad)
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