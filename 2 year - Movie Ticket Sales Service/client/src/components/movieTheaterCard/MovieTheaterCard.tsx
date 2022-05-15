import Style from './MovieTheaterCard.module.css'
import {observer} from 'mobx-react-lite'
import {MovieTheater} from '../../types/MovieTheater'


export const MovieTheaterCard = observer((props: {theater: MovieTheater}): JSX.Element => (
    <div className={Style.container}>
        <img src={props.theater.photo} alt="photo"/>
        <h4>{props.theater.title}</h4>
    </div>
))