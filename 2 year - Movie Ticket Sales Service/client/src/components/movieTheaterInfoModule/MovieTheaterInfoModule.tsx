import {observer} from 'mobx-react-lite'
import {MovieTheater} from '../../types/MovieTheater'
import { MovieGrid } from '../movieGrid/MovieGrid'
import Style from './MovieTheaterInfoModule.module.css'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const MovieTheaterInfoModule = observer((props: { theater: MovieTheater }): JSX.Element => {
    if (props.theater === null) return <></>

    return (
        <div className={Style.container}>
            <div className={Style.baseInfoCard}>
                <img src={props.theater.photo} alt={props.theater.title} className={Style.poster}/>
                <div className={Style.textInfo}>
                    <h2 className={Style.title}>{props.theater.title}</h2>
                    <span className={Style.textInfoRow}>Address: <span>{props.theater.address}</span></span>
                    <span className={Style.textInfoRow}>
                        <iframe src={props.theater.location} width="100%" height="200"
                                style={{border: 0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        />
                    </span>

                    {
                        props.theater && props.theater.movies && props.theater.movies.length > 0
                        &&
                        <>
                            <h2 style={{...DEFAULT_H2_PAGE_TITLE, marginBottom: '20px', marginTop: '30px', fontSize: '25px', color: 'var(--accent-main)'}}>
                                Movies that you can (or could) watch here
                            </h2>
                            <MovieGrid movies={props.theater.movies}
                                       prefixKey={'inexacttheatre'}
                                       styles={{gridTemplateColumns: '1fr 1fr'}}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    )
})