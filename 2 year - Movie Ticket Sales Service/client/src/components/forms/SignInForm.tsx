import {observer} from 'mobx-react-lite'
import React from 'react'
import {Button, ButtonType} from '../UI/button/Button'
import {Input} from '../UI/input/Input'
import {InputCallback} from '../../types/CallbackForInput'
import Style from './Form.module.css'
import {FormSignInCallback} from '../../types/FormCallback'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'
import * as EmailValidator from 'email-validator'


export const SignInForm = observer((props: {styles?: React.CSSProperties, onSignIn: FormSignInCallback}): JSX.Element => {
    const [nickname, setNickname] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')

    const onInputNicknameChange: InputCallback = (value: string): void => setNickname(value)
    const onInputPasswordChange: InputCallback = (value: string): void => setPassword(value)
    const onInputEmailChange: InputCallback = (value: string): void => setEmail(value)

    const checkEmail = (): boolean => EmailValidator.validate(email)
    const checkPassword = (): boolean => /[A-Za-z0-9]{4,}/.test(password)
    const checkNickname = (): boolean => nickname.trim() !== ''


    const onSignInButtonClick = (): void => {
        if (!checkNickname()) {
            window.alert('Nickname must not be empty')
            return
        }

        if (!checkPassword()) {
            window.alert('Password must contain only letters or digits and have length 4 or more')
            return
        }

        if (!checkEmail()) {
            window.alert('Email seems to be incorrect. Check correctness, please')
            return
        }

        props.onSignIn(nickname, password, email)
    }


    return (
        <div className={Style.form} style={props.styles}>
            <h2 style={{...DEFAULT_H2_PAGE_TITLE, width: '100%', color: 'white', textAlign: 'center', margin: 'auto'}}>
                Registration on the website
            </h2>
            <Input placeholder={'Nickname'}
                   onChange={onInputNicknameChange}
                   styles={{width: '50%', marginBottom: 15, marginTop: 30, borderColor: 'white', backgroundColor: 'white', color: 'black'}}
            />
            <Input placeholder={'Password'}
                   onChange={onInputPasswordChange}
                   type={'password'}
                   styles={{width: '50%', marginBottom: 15, borderColor: 'white', backgroundColor: 'white', color: 'black'}}
            />
            <Input placeholder={'email'}
                   type={'email'}
                   onChange={onInputEmailChange}
                   styles={{width: '50%', marginBottom: 30, borderColor: 'white', backgroundColor: 'white', color: 'black'}}
            />

            <Button text={'Register'}
                    type={ButtonType.BUTTON_ANTI_PRIMARY}
                    onClick={(): void => onSignInButtonClick()}
                    styles={{width: 'auto', margin: 'auto'}}
            />
        </div>
    )
})