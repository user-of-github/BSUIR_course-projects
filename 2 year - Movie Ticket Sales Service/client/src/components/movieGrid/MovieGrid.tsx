import {Movie} from '../../types/Movie'
import {Grid} from '../layout/grid/Grid'
import React from 'react'
import {LoadingState} from '../../types/LoadingState'
import {MovieCard} from '../movieCard/MovieCard'
import {Loading} from '../UI/loading/Loading'


interface MovieGridProps {
    loadingState: LoadingState,
    movies: Array<Movie>
    styles?: React.CSSProperties
}


export const MovieGrid = ({loadingState, movies, styles}: MovieGridProps): JSX.Element => {
    return (
        <>
            {
                loadingState === LoadingState.LOADING
                    ?
                    <Loading/>
                    :
                    <Grid styles={styles}>
                        {
                            movies.map((movie: Movie): JSX.Element => (
                                <MovieCard movie={movie} key={movie.id}/>
                            ))
                        }
                    </Grid>
            }
        </>

    )
}