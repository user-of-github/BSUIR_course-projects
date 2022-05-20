import {observer} from 'mobx-react-lite'
import React from 'react'
import Style from '../Pages.module.css'
import StylePages from '../Pages.module.css'
import {NotFound} from '../../components/UI/notFound/NotFound'


export const NotFoundDefaultPage = observer((): JSX.Element => {
    React.useEffect((): void => window.scrollTo({top: 0, left: 0, behavior: 'smooth'}), [])

    return (
        <div className={Style.smoothLoading}>
            <main className={StylePages.main}>
                <NotFound/>
            </main>
        </div>
    )
})