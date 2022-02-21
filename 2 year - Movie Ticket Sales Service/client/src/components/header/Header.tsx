import {Row} from '../layout/row/Row'
import {Input} from '../UI/input/Input'
import Style from './Header.module.css'
import Logo from '../../images/logo.png'
import {Navigation} from '../navigation/Navigation'


export const Header = (): JSX.Element => (
    <header className={Style.header}>
        <Row styles={{alignItems: 'center'}}>
            <img className={Style.logo}
                 height={'80px'}
                 src={Logo}
                 alt={'Logo'}
            />

            <Navigation styles={{marginLeft: '20px'}}/>
            <Input placeholder={'Search movies'}/>
        </Row>
    </header>
)