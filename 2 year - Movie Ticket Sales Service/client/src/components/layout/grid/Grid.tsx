import React from 'react'
import Style from './Grid.module.css'


export const Grid = (props: { children: React.ReactNode, styles?: React.CSSProperties }): JSX.Element => (
    <div className={Style.grid} style={props.styles}>{props.children}</div>
)