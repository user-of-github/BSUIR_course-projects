import {Promo} from '../../components/promo/Promo'
import Style from './Main.module.css'
import StyleSmooth from '../Pages.module.css'
import {Grid} from '../../components/layout/grid/Grid'
import {MovieCard} from '../../components/movieCard/MovieCard'
import {Movie, testMovies} from '../../types/Movie'


export const Main = (): JSX.Element => (
    <div className={StyleSmooth.smoothLoading}>
        <main className={Style.main}>
            <Promo/>
            <h2 style={{color: 'black', fontSize: '30px', marginTop: '50px'}}>
                Popular today:
            </h2>

            <Grid styles={{marginTop: '30px'}}>
                {
                    testMovies.map((movie: Movie): JSX.Element => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))
                }
            </Grid>
        </main>
    </div>
)