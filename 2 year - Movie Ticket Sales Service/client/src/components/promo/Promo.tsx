import Style from './Promo.module.css'
import PromoBackground from '../../images/promo-bgc.png'
import {Button} from '../UI/button/Button'


export const Promo = (): JSX.Element => (
    <div className={Style.promoContainer}>
        <section className={Style.promo}>
            <h1 className={Style.title}>Movie tickets sales online sevice</h1>
            <h2 className={Style.subtitle}>
                Now all movie screenings and ticket purchases are concentrated in one place !
            </h2>

            <p className={Style.text}>
                This project was developed for educational purposes and is not a commercial product. However, the author
                tried to create as much as possible similar to a real working service, which is convenient and pleasant
                to use
            </p>

            <Button text={'Explore tickets now !'} />
        </section>
    </div>
)