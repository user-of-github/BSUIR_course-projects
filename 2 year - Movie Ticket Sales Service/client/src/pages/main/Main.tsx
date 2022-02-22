import {Container} from '../../components/layout/container/Container'
import {Header} from '../../components/header/Header'
import {Promo} from '../../components/promo/Promo'
import Style from './Main.module.css'


export const Main = (): JSX.Element => (
    <Container>
        <Header/>
        <main className={Style.main}>
            <Promo/>
        </main>
        <br/><br/><br/><br/><br/>
        <h1 style={{color: 'black', fontSize: '30px'}}>Popular today: </h1>
    </Container>
)