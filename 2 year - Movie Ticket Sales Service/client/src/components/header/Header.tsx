import {Row} from '../layout/row/Row'
import {Input} from '../UI/input/Input'
import Style from './Header.module.css'
import Logo from '../../images/logo.png'
import {Navigation} from '../navigation/Navigation'
import {Button, ButtonStrokeType, ButtonType} from '../UI/button/Button'
import {Link} from 'react-router-dom'
import {InputCallback} from '../../types/CallbackForInput'
import {MainState} from '../../types/mainState/MainState'
import {observer} from 'mobx-react-lite'


export const Header = observer((props: { callbackForSearch: InputCallback, state: MainState }): JSX.Element => (
    <header className={Style.header}>
        <Row styles={{alignItems: 'center', justifyContent: 'flex-start'}}>
            <Link to={'/'}>
                <img className={Style.logo}
                     height={'80px'}
                     src={Logo}
                     alt={'Logo'}
                />
            </Link>

            <Navigation styles={{marginLeft: 20, marginRight: 10}}/>
            <Input placeholder={'Search movies'}
                   styles={{marginRight: 10}}
                   onEnter={(value: string): void => props.callbackForSearch(value)}
            />
            {
                props.state.user !== null
                    ?
                    <>
                        <Link to={'/history'}>
                            <Button text={'🔔'} type={ButtonType.BUTTON_PRIMARY} />
                        </Link>
                        <Link to={'/account'} style={{marginRight: 5, marginLeft: 5}}>
                            <Button text={'👤'}
                                    type={ButtonType.BUTTON_PRIMARY}
                                    strokeType={ButtonStrokeType.BUTTON_STROKE}
                            />
                        </Link>
                        <Button text={'Log out'}
                                strokeType={ButtonStrokeType.BUTTON_STROKE}
                                onClick={(): void => props.state.logOut()}
                        />
                    </>
                    :
                    <>
                        <Link to={'/login'} style={{marginRight: 10}}>
                            <Button text={'Log in'} strokeType={ButtonStrokeType.BUTTON_STROKE}/>
                        </Link>
                        <Link to={'/signin'}>
                            <Button text={'Sign in'} strokeType={ButtonStrokeType.BUTTON_STROKE}/>
                        </Link>
                    </>
            }
        </Row>
    </header>
))