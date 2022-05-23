import StylePages from '../Pages.module.css'
import React from 'react'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import Style from './ContactPage.module.css'



export const ContactPage = (): JSX.Element => {
    React.useEffect((): void => window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }), [])

    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <h2 style={DEFAULT_H2_PAGE_TITLE}>Welcome to this fullstack project !</h2>
                <h4 style={{...DEFAULT_H2_PAGE_TITLE, fontWeight: 100, fontSize: 20}}>It is created in educational purposes. But anyway I tried to do my best</h4>
                <br/>
                <br/>
                <br/>
                <br/>
                <h3 style={{...DEFAULT_H2_PAGE_TITLE, fontSize: 30, marginLeft: 30,fontWeight: 300, color: 'var(--accent-main)'}}>
                    {'<> Some facts about this project </>'}
                </h3>
                <ul className={Style.informationList}>
                    <li>Author: Slutski Nikita</li>
                    <li><a href="https://github.com/user-of-github" target="new">Link to GitHub profile</a></li>
                    <li><a href="https://github.com/user-of-github/BSUIR_Labs_Programming-tools" target="new">Link to repository, where code of server is situated</a></li>
                    <li><a href="https://github.com/user-of-github/BSUIR_course-projects" target="new">Link to repository, where code of client is situated</a></li>
                    <li>Technologies stack: {'{ Python, Django, Django-Rest-Framework, PostgreSQL }'} + {'{ TypeScript, React, MobX }'}</li>
                    <li>Copyright © 2022 | All Rights Reserved</li>
                </ul>

            </main>
        </div>
    )
}