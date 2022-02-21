import React from 'react'
import {Row} from '../layout/row/Row'
import {Button} from '../UI/button/Button'
import Style from './Navigation.module.css'


export const Navigation = (props: {styles?: React.CSSProperties}): JSX.Element => (
    <nav className={Style.nav} style={props.styles}>
        <Row>
            <Button text={'Homepage'}/>
        </Row>
    </nav>
)