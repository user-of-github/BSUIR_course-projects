import {Movie} from '../../types/Movie'
import Style from './MovieInfoModule.module.css'
import {observer} from 'mobx-react-lite'


export const MovieInfoModule = observer((props: { movie: Movie }): JSX.Element => {
    if (props.movie === null) return <></>

    return (
        <div className={Style.container}>
            <div className={Style.baseInfoCard}>
                <img src={props.movie.poster_image_link} alt={props.movie.id} className={Style.poster}/>
                <div className={Style.textInfo}>
                    <h2 className={Style.title}>{props.movie.title}</h2>
                    <span className={Style.textInfoRow}>Year: <span>{props.movie.year}</span></span>
                    <span className={Style.textInfoRow}>
                        Age restriction:
                        <span>{props.movie.age_restriction}+</span>
                    </span>
                    <span className={Style.textInfoRow}>Duration: <span>{props.movie.duration} min</span></span>
                    <span className={Style.textInfoRow}>
                        Rating:
                        <span title={`Rating: ${props.movie.rating}`}>{'⭐'.repeat(props.movie.rating)}</span>
                    </span>
                    <span className={Style.textInfoRow}>Lasts:
                        <span>
                            {new Date(props.movie.date_from).toDateString()}
                            {' —> '}
                            {new Date(props.movie.date_to).toDateString()}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
})