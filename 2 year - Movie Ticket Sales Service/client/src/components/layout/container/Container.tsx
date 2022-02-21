import React from 'react'
import Style from './Container.module.css'


export const Container = ({children}: {children: React.ReactNode}): JSX.Element => (
    <div className={Style.container}>{children}</div>
)