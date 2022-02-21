import React from 'react'
import Style from './Row.module.css'


export const Row = (props: { children: React.ReactNode, styles?: React.CSSProperties }): JSX.Element => (
    <div className={Style.container} style={props.styles}>{props.children}</div>
)