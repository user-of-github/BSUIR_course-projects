import React from 'react'
import Style from './Button.module.css'


export enum ButtonType {
    BUTTON_DEFAULT = 'BUTTON_DEFAULT',
    BUTTON_NO_STROKE = 'BUTTON_NO_STROKE'
}


export const Button = (props: { text: string, styles?: React.CSSProperties, type?: ButtonType }): JSX.Element => (
    <button className={`${Style.button} ${props.type === ButtonType.BUTTON_NO_STROKE ? '' : Style.buttonStroke}`}
            style={props.styles}>
        {props.text}
    </button>
)