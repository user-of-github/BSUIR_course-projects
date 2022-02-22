import React from 'react'
import {Row} from '../layout/row/Row'
import {Button, ButtonStrokeType} from '../UI/button/Button'
import Style from './Navigation.module.css'
import {Link} from 'react-router-dom'


export const Navigation = (props: {styles?: React.CSSProperties}): JSX.Element => (
    <nav className={Style.nav} style={props.styles}>
        <Row>
            <Link to={'/'}><Button text={'Homepage'} strokeType={ButtonStrokeType.BUTTON_NO_STROKE}/></Link>
            <Link to={'/movies'}>
                <Button text={'Movies'}
                        strokeType={ButtonStrokeType.BUTTON_NO_STROKE}
                        styles={{marginLeft: '7px'}}
                />
            </Link>
            <Link to={'/movie-theaters'}>
                <Button text={'Movie Theaters'}
                        strokeType={ButtonStrokeType.BUTTON_NO_STROKE}
                        styles={{marginLeft: '7px'}}
                />
            </Link>
            <Link to={'/contact'}>
                <Button text={'Contact'}
                        strokeType={ButtonStrokeType.BUTTON_NO_STROKE}
                        styles={{marginLeft: '7px'}}
                />
            </Link>
        </Row>
    </nav>
)