import Style from './MovieInfoModule.module.css'
import {observer} from 'mobx-react-lite'
import {MovieTheatersList} from '../movieTheatersList/MovieTheatersList'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import {Button} from '../UI/button/Button'
import {MainState} from '../../types/mainState/MainState'


export const MovieInfoModule = observer(({state}: { state: MainState }): JSX.Element => {
    if (state.moviePageState.movie === null) return <></>

    return (
        <div className={Style.container}>
            <div className={Style.baseInfoCard}>
                {
                    state.user !== null
                    &&
                    <div className={Style.addToFavourites}>
                        <Button text={!state.moviePageState.isFavourite ? '❤️ Add to favourite ❤️' :
                            'Remove from favourites️'}
                                onClick={() => {
                                    state.addOrRemoveMovieToFavourite(
                                        state.moviePageState.movie?.movie_id || 'someunknownstr2022',
                                        !state.moviePageState.isFavourite
                                    )
                                }}
                        />
                    </div>
                }
                <img src={state.moviePageState.movie.poster_image_link} alt={state.moviePageState.movie.id}
                     className={Style.poster}/>
                <div className={Style.textInfo}>
                    <h2 className={Style.title}>{state.moviePageState.movie.title}</h2>
                    <span
                        className={Style.textInfoRow}>Year <span>{state.moviePageState.movie.year}</span></span>
                    <span className={Style.textInfoRow}>
                        Age restriction
                        <span>{state.moviePageState.movie.age_restriction}+</span>
                    </span>
                    <span
                        className={Style.textInfoRow}>Duration <span>{state.moviePageState.movie.duration} min</span></span>
                    <span className={Style.textInfoRow}>
                        Rating
                        <span title={`Rating: ${state.moviePageState.movie.rating}`}>{'⭐'.repeat(
                            state.moviePageState.movie.rating)}</span>
                    </span>
                    <span className={Style.textInfoRow}>Lasts
                        <span>
                            {new Date(state.moviePageState.movie.date_from).toDateString()}
                            {' —> '}
                            {new Date(state.moviePageState.movie.date_to).toDateString()}
                        </span>
                    </span>
                    <h2 style={{
                        ...DEFAULT_H2_PAGE_TITLE,
                        marginBottom: '20px',
                        marginTop: '30px',
                        fontSize: '25px',
                        color: 'var(--accent-main)'
                    }}>
                        Where to watch ?
                    </h2>
                    <MovieTheatersList cinemas={state.moviePageState.theatersList}/>
                </div>
            </div>
        </div>
    )
})