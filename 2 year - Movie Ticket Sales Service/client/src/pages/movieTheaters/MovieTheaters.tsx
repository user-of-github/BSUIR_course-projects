import Style from '../Pages.module.css'
import StylePages from '../Pages.module.css'
import React from 'react'


export const MovieTheaters = (): JSX.Element => {
    React.useEffect((): void => window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }), [])

    return (
        <div className={Style.smoothLoading}>
            <main className={StylePages.main}>MOVIE THEATERS</main>
        </div>
    )
}