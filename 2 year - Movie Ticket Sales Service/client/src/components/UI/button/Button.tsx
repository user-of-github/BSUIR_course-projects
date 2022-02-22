import React from 'react'
import {getClassesStringForButton} from './buttonUtilities'


export enum ButtonStrokeType {
    BUTTON_STROKE = 'BUTTON_STROKE',
    BUTTON_NO_STROKE = 'BUTTON_NO_STROKE'
}

export enum ButtonType {
    BUTTON_PRIMARY = 'BUTTON_PRIMARY',
    BUTTON_ANTI_PRIMARY = 'BUTTON_ANTI_PRIMARY'
}

export const Button = (props: { text: string, styles?: React.CSSProperties, type?: ButtonType, strokeType?: ButtonStrokeType }): JSX.Element => (
    <button className={getClassesStringForButton(props.type, props.strokeType)}
            style={props.styles}>
        {props.text}
    </button>
)