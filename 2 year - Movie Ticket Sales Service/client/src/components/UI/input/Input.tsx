import Style from './Input.module.css'
import React from 'react'
import {InputCallback} from '../../../types/CallbackForInput'


interface InputProps {
    placeholder: string,
    type?: string,
    onEnter?: InputCallback,
    onChange?: InputCallback,
    styles?: React.CSSProperties
}

export const Input = (props: InputProps): JSX.Element => {
    const [state, setState] = React.useState<string>('')

    const inputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState(event.target.value)
        props.onChange && props.onChange(event.target.value)
    }

    const onEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        props.onEnter && (event.key === 'Enter' && props.onEnter(state))
    }

    return (
        <input type={props.type || 'text'}
               className={Style.input}
               style={props.styles}
               placeholder={props.placeholder}
               onChange={event => inputChanged(event)}
               onKeyPress={event => onEnterPressed(event)}
        />
    )
}