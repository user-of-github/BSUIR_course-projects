import {observer} from 'mobx-react-lite'
import {MovieTheater} from '../../types/MovieTheater'
import Style from './MovieTheaterInfoModule.module.css'


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
                </div>
            </div>
        </div>
    )
})