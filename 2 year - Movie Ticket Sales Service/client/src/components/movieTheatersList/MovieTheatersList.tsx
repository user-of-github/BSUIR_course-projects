import Style from './MovieTheatersList.module.css'
import {observer} from 'mobx-react-lite'
import {MovieTheater} from '../../types/MovieTheater'
import {MovieTheaterCard} from '../movieTheaterCard/MovieTheaterCard'
import React from 'react'


export const MovieTheatersList = observer(
    (props: { cinemas: Array<MovieTheater>, styles?: React.CSSProperties }): JSX.Element => (
        <div className={Style.container} style={props.styles}>
            {
                props.cinemas.map((movieTheater: MovieTheater): JSX.Element => (
                    <MovieTheaterCard theater={movieTheater}
                                      key={`movietheater${movieTheater.title}`}
                                      styles={{marginBottom: '20px'}}
                    />
                ))
            }
        </div>
    )
)