import {observer} from 'mobx-react-lite'
import {FormLogInCallback, FormSignInCallback} from '../../types/FormCallback'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import {SignInForm} from '../../components/forms/SignInForm'
import {LogInForm} from '../../components/forms/LogInForm'
import StylePages from '../Pages.module.css'


export const LogInPage = observer((): JSX.Element => {
    const onLogInCallback: FormLogInCallback = (login: string, password: string): void => {
        window.alert('Logging in')
    }

    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <LogInForm onLogIn={onLogInCallback}/>
            </main>
        </div>
    )
})