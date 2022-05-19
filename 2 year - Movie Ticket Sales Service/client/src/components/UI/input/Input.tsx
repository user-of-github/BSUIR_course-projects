import Style from './Input.module.css'
import React from 'react'
import {InputCallback} from '../../../types/CallbackForInput'


export const Input = (props: { placeholder: string, callback: InputCallback, styles?: React.CSSProperties }): JSX.Element => {
    const [state, setState] = React.useState<string>('')

    const inputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => setState(event.target.value)

    const onEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        event.key == 'Enter' && props.callback(state)
    }

    return (
        <input type="text"
               className={Style.input}
               style={props.styles}
               placeholder={props.placeholder}
               onChange={event => inputChanged(event)}
               onKeyPress={event => onEnterPressed(event)}
        />
    )
}