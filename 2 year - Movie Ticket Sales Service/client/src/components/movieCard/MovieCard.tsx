import {Movie} from '../../types/Movie'
import Style from './MovieCard.module.css'
import {Link} from 'react-router-dom'


export const MovieCard = ({movie}: { movie: Movie }): JSX.Element => (
    <Link to={`/movie?movie-id=${movie.id}`} style={{textDecoration: 'none'}}>
        <div className={Style.card}>
            <img src={movie.cover} className={Style.cover} alt={movie.title}/>
            <div className={Style.info}>
                <h3 className={Style.title}>{movie.title}</h3>
                <span className={Style.date}>🕑 {new Date(movie.dates.from).toDateString()}</span>
                <span className={Style.date}>🕑 {new Date(movie.dates.to).toDateString()}</span>
            </div>
        </div>
    </Link>
)