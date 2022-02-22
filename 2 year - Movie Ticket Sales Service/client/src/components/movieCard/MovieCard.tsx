import {Movie} from '../../types/Movie'
import Style from './MovieCard.module.css'


export const MovieCard = ({movie}: {movie: Movie}): JSX.Element => (
    <div className={Style.card}>
        <img src={movie.cover} className={Style.cover} alt={movie.title}/>
        <div className={Style.info}>
            <h3 className={Style.title}>{movie.title}</h3>
            <span className={Style.date}>🕑 {movie.dates.from.toDateString()}</span>
            <span className={Style.date}>🕑 {movie.dates.to.toDateString()}</span>
        </div>
    </div>
)