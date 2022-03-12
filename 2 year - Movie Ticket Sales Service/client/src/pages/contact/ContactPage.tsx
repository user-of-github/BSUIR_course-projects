import StylePages from '../Pages.module.css'
import React from 'react'


export const ContactPage = (): JSX.Element => {
    React.useEffect((): void => window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }), [])

    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>

            </main>
        </div>
    )
}