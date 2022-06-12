import Style from '../Pages.module.css'
import StylePages from '../Pages.module.css'
import React from 'react'
import {MainState} from '../../types/mainState/MainState'
import {MovieTheatersList} from '../../components/movieTheatersList/MovieTheatersList'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {observer} from 'mobx-react-lite'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const MovieTheatersPage = observer((props: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        props.state.loadMovieTheatersList()
    }, [props.state])

    return (
        <div className={Style.smoothLoading}>
            <main className={StylePages.main}>
                <h2 style={DEFAULT_H2_PAGE_TITLE}>All movie theaters</h2>

                {
                    props.state.movieTheatersPageState.loading === LoadingState.LOADING
                        ? <Loading/>
                        :
                        <MovieTheatersList cinemas={props.state.movieTheatersPageState.movieTheatersLoaded}
                                           styles={{marginTop: '50px'}}
                        />
                }
            </main>
        </div>
    )
})