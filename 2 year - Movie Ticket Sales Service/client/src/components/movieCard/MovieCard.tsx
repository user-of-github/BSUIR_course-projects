import {Movie} from '../../types/Movie'
import Style from './MovieCard.module.css'
import {Link} from 'react-router-dom'
import React from 'react'


export const MovieCard = ({movie, styles}: { movie: Movie, styles?: React.CSSProperties }): JSX.Element => (
    <Link to={`/movie?id=${movie.id}`} style={{textDecoration: 'none'}}>
        <div className={Style.card} style={styles}>
            <img src={movie.cover} className={Style.cover} alt={movie.title}/>
            <div className={Style.info}>
                <h3 className={Style.title}>{movie.title}</h3>
                <span className={Style.date}>🕑 {new Date(movie.dates.from).toDateString()}</span>
                <span className={Style.date}>🕑 {new Date(movie.dates.to).toDateString()}</span>
            </div>
        </div>
    </Link>
)