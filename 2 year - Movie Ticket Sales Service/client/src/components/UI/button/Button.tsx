import React from 'react'
import {getClassesStringForButton} from './buttonUtilities'


type ButtonClickHandler = () => void

export enum ButtonStrokeType {
    BUTTON_STROKE = 'BUTTON_STROKE',
    BUTTON_NO_STROKE = 'BUTTON_NO_STROKE'
}

export enum ButtonType {
    BUTTON_PRIMARY = 'BUTTON_PRIMARY',
    BUTTON_ANTI_PRIMARY = 'BUTTON_ANTI_PRIMARY',
    BUTTON_PRIMARY_FILLED = 'BUTTON_PRIMARY_FILLED'
}


export const Button = (props: { text: string, styles?: React.CSSProperties, type?: ButtonType, strokeType?: ButtonStrokeType, onClick?: ButtonClickHandler }): JSX.Element => (
    <button className={getClassesStringForButton(props.type, props.strokeType)}
            style={props.styles}
            onClick={(event: React.MouseEvent<HTMLButtonElement>): void => props.onClick && props.onClick()}
    >
        {props.text}
    </button>
)