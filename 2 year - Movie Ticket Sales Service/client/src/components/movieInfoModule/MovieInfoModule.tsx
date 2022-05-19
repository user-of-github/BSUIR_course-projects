import Style from './MovieInfoModule.module.css'
import {observer} from 'mobx-react-lite'
import {MoviePageState} from '../../types/mainState/MoviePageState'
import { MovieTheatersList } from '../movieTheatersList/MovieTheatersList'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const MovieInfoModule = observer((props: { state: MoviePageState }): JSX.Element => {
    if (props.state.movie === null) return <></>

    return (
        <div className={Style.container}>
            <div className={Style.baseInfoCard}>
                <img src={props.state.movie.poster_image_link} alt={props.state.movie.id} className={Style.poster}/>
                <div className={Style.textInfo}>
                    <h2 className={Style.title}>{props.state.movie.title}</h2>
                    <span className={Style.textInfoRow}>Year <span>{props.state.movie.year}</span></span>
                    <span className={Style.textInfoRow}>
                        Age restriction
                        <span>{props.state.movie.age_restriction}+</span>
                    </span>
                    <span className={Style.textInfoRow}>Duration <span>{props.state.movie.duration} min</span></span>
                    <span className={Style.textInfoRow}>
                        Rating
                        <span title={`Rating: ${props.state.movie.rating}`}>{'⭐'.repeat(props.state.movie.rating)}</span>
                    </span>
                    <span className={Style.textInfoRow}>Lasts
                        <span>
                            {new Date(props.state.movie.date_from).toDateString()}
                            {' —> '}
                            {new Date(props.state.movie.date_to).toDateString()}
                        </span>
                    </span>
                    <h2 style={{...DEFAULT_H2_PAGE_TITLE, marginBottom: '20px', marginTop: '30px', fontSize: '25px', color: 'var(--accent-main)'}}>
                        Where to watch ?
                    </h2>
                    <MovieTheatersList cinemas={props.state.theatersList}/>
                </div>
            </div>
        </div>
    )
})