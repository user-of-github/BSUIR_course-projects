import React from 'react'
import StylePages from '../Pages.module.css'
import {Movie, testMovies} from '../../types/Movie'
import {Core} from '../../types/Core'
import {Loading} from '../../components/UI/loading/Loading'


export const MoviePage = (props: {controller: Core}): JSX.Element => {
    const [movieToShow, setMovieToShow] = React.useState<Movie | undefined>(undefined)

    const findMovie = (id: string): Movie | undefined => testMovies.find((movie: Movie) => movie.id === id)


    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

        setMovieToShow(findMovie(new URLSearchParams(window.location.search).get('movie-id') || ''))
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <Loading />
            </main>
        </div>
    )
}