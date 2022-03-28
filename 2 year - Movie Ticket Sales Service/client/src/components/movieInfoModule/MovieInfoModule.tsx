import {Movie} from '../../types/Movie'
import Style from './MovieInfoModule.module.css'
import {observer} from 'mobx-react-lite'


export const MovieInfoModule = observer((props: { movie: Movie }): JSX.Element => {
    if (props.movie === null) return <></>

    return (
        <div className={Style.container}>
            <div className={Style.baseInfoCard}>
                <img src={props.movie.cover} alt={props.movie.id} className={Style.poster}/>
                <div className={Style.textInfo}>
                    <h2 className={Style.title}>{props.movie.title}</h2>
                    <span className={Style.textInfoRow}>Year: <span>{props.movie.year}</span></span>
                    <span className={Style.textInfoRow}>Age restriction: <span>{props.movie.ageRestriction}+</span></span>
                    <span className={Style.textInfoRow}>Duration: <span>{props.movie.duration} min</span></span>
                    <span className={Style.textInfoRow}>Rating: <span>{'⭐'.repeat(props.movie.rating)}</span></span>
                </div>
            </div>
        </div>
    )
})