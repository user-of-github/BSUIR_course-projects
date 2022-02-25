import {Row} from '../layout/row/Row'
import {Input} from '../UI/input/Input'
import Style from './Header.module.css'
import Logo from '../../images/logo.png'
import {Navigation} from '../navigation/Navigation'
import {Button, ButtonStrokeType} from '../UI/button/Button'
import {Link} from 'react-router-dom'


export const Header = (): JSX.Element => (
    <header className={Style.header}>
        <Row styles={{alignItems: 'center', justifyContent: 'flex-start'}}>
            <Link to={'/'}>
                <img className={Style.logo}
                     height={'80px'}
                     src={Logo}
                     alt={'Logo'}
                />
            </Link>

            <Navigation styles={{marginLeft: '20px', marginRight: '30px'}}/>
            <Input placeholder={'Search movies'}
                   styles={{marginRight: 'auto'}}
            />
            <Button text={'Log in'}
                    strokeType={ButtonStrokeType.BUTTON_STROKE}
            />
        </Row>
    </header>
)