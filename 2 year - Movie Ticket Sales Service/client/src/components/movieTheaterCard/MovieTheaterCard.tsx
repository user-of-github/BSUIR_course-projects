import Style from './MovieTheaterCard.module.css'
import {observer} from 'mobx-react-lite'
import {MovieTheater} from '../../types/MovieTheater'
import {Link} from 'react-router-dom'
import React from 'react'


export const MovieTheaterCard = observer((props: {theater: MovieTheater, styles?: React.CSSProperties}): JSX.Element => (
   <Link to={`/movie-theater?cinema-name=${props.theater.title}`} style={{textDecoration: 'none', width: '100%'}}>
       <div className={Style.container} style={props.styles}>
           <img className={Style.image} src={props.theater.photo} alt="photo"/>
           <h4 className={Style.title}>{props.theater.title}</h4>
           <span className={Style.address}>{props.theater.address}</span>
       </div>
   </Link>
))