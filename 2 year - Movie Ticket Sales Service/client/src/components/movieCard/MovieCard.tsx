import {MovieShorten} from '../../types/Movie'
import Style from './MovieCard.module.css'
import {Link} from 'react-router-dom'
import React from 'react'


export const MovieCard = ({movie, styles}: { movie: MovieShorten, styles?: React.CSSProperties }): JSX.Element => {
    if (movie.movie_id === undefined)
        return <></>

    return (
        <Link to={`/movie?id=${movie.movie_id}`} style={{textDecoration: 'none'}}>
            <div className={Style.card} style={styles}>
                <img src={movie.poster_image_link} className={Style.cover} alt={movie.title}/>
                <div className={Style.info}>
                    <h3 className={Style.title}>{movie.title}</h3>
                    <span className={Style.date}>🕑 {new Date(movie.date_from).toDateString()}</span>
                    <span className={Style.date}>🕑 {new Date(movie.date_to).toDateString()}</span>
                </div>
            </div>
        </Link>
    )
}
