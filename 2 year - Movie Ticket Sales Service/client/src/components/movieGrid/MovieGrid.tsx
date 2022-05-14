import {Movie, MovieShorten} from '../../types/Movie'
import {Grid} from '../layout/grid/Grid'
import React from 'react'
import {MovieCard} from '../movieCard/MovieCard'
import {observer} from 'mobx-react-lite'


interface MovieGridProps {
    movies: Array<MovieShorten>
    styles?: React.CSSProperties
}


export const MovieGrid = observer(({movies, styles}: MovieGridProps): JSX.Element => (
        <Grid styles={styles}>
            {
                movies.map((movie: MovieShorten): JSX.Element => (
                    <MovieCard movie={movie} key={`moviecard-${movie.movie_id}`}/>
                ))
            }
        </Grid>
))
