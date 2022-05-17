import {Movie, MovieShorten} from '../../types/Movie'
import {Grid} from '../layout/grid/Grid'
import React from 'react'
import {MovieCard} from '../movieCard/MovieCard'
import {observer} from 'mobx-react-lite'


interface MovieGridProps {
    movies: Array<MovieShorten>
    styles?: React.CSSProperties
    prefixKey?: string
}


export const MovieGrid = observer(({movies, styles, prefixKey = ''}: MovieGridProps): JSX.Element => (
        <Grid styles={styles}>
            {
                movies.filter(movie => movie.movie_id !== undefined).map((movie: MovieShorten): JSX.Element => (
                    <MovieCard movie={movie} key={`${prefixKey}moviecard-${movie.movie_id}`}/>
                ))
            }
        </Grid>
    )
)
