import Style from './Input.module.css'
import React from 'react'


export const Input = (props: {placeholder: string, styles?: React.CSSProperties}): JSX.Element => (
    <input type="text"
           className={Style.input}
           style={props.styles}
           placeholder={props.placeholder}
    />
)