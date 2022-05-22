import {observer} from 'mobx-react-lite'
import {FormLogInCallback} from '../../types/FormCallback'
import {LogInForm} from '../../components/forms/LogInForm'
import StylePages from '../Pages.module.css'
import {MainState} from '../../types/mainState/MainState'
import {Navigate} from 'react-router-dom'


export const LogInPage = observer(({state}: { state: MainState }): JSX.Element => {
    const onLogInCallback: FormLogInCallback = (login: string, password: string): void => {
        state.authorize(login, password)
    }

    return (
        <>
            {
                state.user === null
                    ?
                    <div className={StylePages.smoothLoading}>
                        <main className={StylePages.main}>
                            <LogInForm onLogIn={onLogInCallback}/>
                        </main>
                    </div>
                    :
                    <Navigate to='/account'/>
            }
        </>
    )
})