import {Promo} from '../../components/promo/Promo'
import Style from './Main.module.css'
import StylePages from '../Pages.module.css'
import {Grid} from '../../components/layout/grid/Grid'
import {MovieCard} from '../../components/movieCard/MovieCard'
import {Movie, testMovies} from '../../types/Movie'
import React from 'react'


export const Main = (): JSX.Element => {
    React.useEffect((): void => window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }), [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <Promo/>
                <h2 style={{color: 'black', fontSize: '30px', marginTop: '50px'}}>
                    Popular today:
                </h2>

                <Grid styles={{marginTop: '30px'}}>
                    {
                        testMovies.slice(0, 3).map((movie: Movie): JSX.Element => (
                            <MovieCard movie={movie} key={movie.id}/>
                        ))
                    }
                </Grid>
            </main>
        </div>
    )
}