import Style from './NotFound.module.css'
import NotFoundImage from '../../images/error-404.png'


export const NotFound = (): JSX.Element => (
    <div className={Style.container}>
        <h2 className={Style.title}>{`{  We couldn't find the requested item  }`}</h2>
        <img src={NotFoundImage} className={Style.image} alt="not found picture | Error 404"/>
    </div>
)