import React from 'react'
import {observer} from 'mobx-react-lite'

import {Grid} from '../layout/grid/Grid'
import {MovieShorten} from '../../types/Movie'
import {MovieCard} from '../movieCard/MovieCard'


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
