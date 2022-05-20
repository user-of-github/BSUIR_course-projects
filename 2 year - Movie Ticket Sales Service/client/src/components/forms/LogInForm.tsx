import {observer} from 'mobx-react-lite'
import React from 'react'
import {InputCallback} from '../../types/CallbackForInput'
import Style from './Form.module.css'
import {Input} from '../UI/input/Input'
import {Button, ButtonType} from '../UI/button/Button'
import {FormLogInCallback} from '../../types/FormCallback'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const LogInForm = observer((props: {styles?: React.CSSProperties, onLogIn: FormLogInCallback}): JSX.Element => {
    const [nickname, setNickname] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const onInputNicknameChange: InputCallback = (value: string): void => setNickname(value)
    const onInputPasswordChange: InputCallback = (value: string): void => setPassword(value)

    const checkPassword = (): boolean => /[A-Za-z0-9]{4,}/.test(password)
    const checkNickname = (): boolean => nickname.trim() !== ''


    const onLogInButtonClick = (): void => {
        if (!checkNickname()) {
            window.alert('Nickname must not be empty')
            return
        }

        if (!checkPassword()) {
            window.alert('Password must contain only letters or digits and have length 4 or more')
            return
        }

        props.onLogIn(nickname, password)
    }


    return (
        <div className={Style.form} style={props.styles}>
            <h2 style={{...DEFAULT_H2_PAGE_TITLE, width: '100%', color: 'white', textAlign: 'center', margin: 'auto'}}>
                Log in to account
            </h2>
            <Input placeholder={'Nickname'}
                   onChange={onInputNicknameChange}
                   styles={{width: '50%', marginBottom: 15, marginTop: 30, borderColor: 'white', backgroundColor: 'white', color: 'black'}}
            />
            <Input placeholder={'Password'}
                   onChange={onInputPasswordChange}
                   type={'password'}
                   styles={{width: '50%', marginBottom: 30, borderColor: 'white', backgroundColor: 'white', color: 'black'}}
            />

            <Button text={'log in to your profile'}
                    type={ButtonType.BUTTON_ANTI_PRIMARY}
                    onClick={(): void => onLogInButtonClick()}
                    styles={{width: 'auto', margin: 'auto'}}
            />
        </div>
    )
})