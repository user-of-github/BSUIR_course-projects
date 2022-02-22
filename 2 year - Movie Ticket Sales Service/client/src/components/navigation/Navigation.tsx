import React from 'react'
import {Row} from '../layout/row/Row'
import {Button, ButtonType} from '../UI/button/Button'
import Style from './Navigation.module.css'


export const Navigation = (props: {styles?: React.CSSProperties}): JSX.Element => (
    <nav className={Style.nav} style={props.styles}>
        <Row>
            <Button text={'Homepage'} type={ButtonType.BUTTON_NO_STROKE}/>
            <Button text={'Movies'}
                    type={ButtonType.BUTTON_NO_STROKE}
                    styles={{marginLeft: '7px'}}
            />
            <Button text={'Movie Theaters'}
                    type={ButtonType.BUTTON_NO_STROKE}
                    styles={{marginLeft: '7px'}}
            />
            <Button text={'Contact'}
                    type={ButtonType.BUTTON_NO_STROKE}
                    styles={{marginLeft: '7px'}}
            />
        </Row>
    </nav>
)