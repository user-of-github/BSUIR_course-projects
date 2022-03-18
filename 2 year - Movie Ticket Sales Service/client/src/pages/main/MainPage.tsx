import {Promo} from '../../components/promo/Promo'
import StylePages from '../Pages.module.css'
import {Movie} from '../../types/Movie'
import React from 'react'
import {Core} from '../../types/Core'
import {LoadingState} from '../../types/LoadingState'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'
import {ServerResponse} from '../../types/ServerResponse'
import {RequestCallback} from '../../types/RequestCallback'


export const MainPage = (props: { controller: Core }): JSX.Element => {
    const [popularMovies, setPopularMovies] = React.useState<Array<Movie>>([])
    const [loading, setLoading] = React.useState<LoadingState>(LoadingState.LOADING)

    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

        const onPopularMoviesLoad: RequestCallback = (data, error) => {
            setLoading(LoadingState.LOADED)

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponse = JSON.parse(data!)

            if (parsedResponse.success) // @ts-ignore
                setPopularMovies(Array.from(parsedResponse.data))
            else
                setPopularMovies([])
        }

        props.controller.getPopularMovies(onPopularMoviesLoad)
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