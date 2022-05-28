import Style from './TextArea.module.css'
import React from 'react'


interface TextAreaProps {
    onChange?: any
    styles?: React.CSSProperties
}

export const TextArea = (props: TextAreaProps): JSX.Element => (
    <textarea className={Style.textarea}
              onChange={event => props.onChange && props.onChange(event.target.value)}
              style={props.styles}
              maxLength={300}
              required={true}
    />
)