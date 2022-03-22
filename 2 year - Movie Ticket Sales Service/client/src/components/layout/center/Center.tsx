import React from 'react'
import Style from './Center.module.css'


export const Center = (props: { children: React.ReactChild, styles?: React.CSSProperties }): JSX.Element => (
    <div className={Style.centered} style={props.styles}>{props.children}</div>
)