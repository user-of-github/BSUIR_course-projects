import {observer} from 'mobx-react-lite'
import {SignInForm} from '../../components/forms/SignInForm'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import {FormSignInCallback} from '../../types/FormCallback'
import StylePages from '../Pages.module.css'


export const SignInPage = observer((): JSX.Element => {
    const onSignInCallback: FormSignInCallback = (login: string, password: string, email: string): void => {
        window.alert('Signing in')
    }

    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <SignInForm onSignIn={onSignInCallback}/>
            </main>
        </div>
    )
})