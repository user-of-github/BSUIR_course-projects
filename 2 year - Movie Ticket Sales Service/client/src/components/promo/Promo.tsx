import Style from './Promo.module.css'
import {Button, ButtonType} from '../UI/button/Button'
import {Link} from 'react-router-dom'


export const Promo = (): JSX.Element => (
    <div className={Style.promoContainer}>
        <section className={Style.promo}>
            <h1 className={Style.title}>Movie tickets sales online service</h1>
            <h2 className={Style.subtitle}>
                Now all movie screenings and ticket purchases are concentrated in one place&nbsp;!
            </h2>

            <p className={Style.text}>
                This project was developed for educational purposes and is not a commercial product. However, the author
                tried to create as much as possible similar to a real working service, which is convenient and pleasant
                to use
            </p>

            <Link to={"/movies"}>
                <Button text={'Explore all movies now !'}
                        type={ButtonType.BUTTON_ANTI_PRIMARY}
                        styles={{marginTop: '30px'}}
                />
            </Link>
        </section>
    </div>
)