import StylePages from '../Pages.module.css'
import {Grid} from '../../components/layout/grid/Grid'
import {Movie, testMovies} from '../../types/Movie'
import {MovieCard} from '../../components/movieCard/MovieCard'
import React from 'react'


export const Movies = (): JSX.Element => {
    React.useEffect((): void => window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }), [])

    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <Grid styles={{gridRowGap: '30px'}}>
                    {
                        testMovies.map((movie: Movie): JSX.Element => (
                            <MovieCard movie={movie} key={movie.id}/>
                        ))
                    }
                </Grid>
            </main>
        </div>
    )
}