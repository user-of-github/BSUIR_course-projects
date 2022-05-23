import {observer} from 'mobx-react-lite'
import {SignInForm} from '../../components/forms/SignInForm'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import {FormSignInCallback} from '../../types/FormCallback'
import StylePages from '../Pages.module.css'
import {MainState} from '../../types/mainState/MainState'


export const SignInPage = observer(({state}: {state: MainState}): JSX.Element => {
    const onSignInCallback: FormSignInCallback = (login: string, password: string, email: string): void => {
        state.register(login, password, email)
    }

    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <SignInForm onSignIn={onSignInCallback}/>
            </main>
        </div>
    )
})