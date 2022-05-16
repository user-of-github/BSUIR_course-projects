import StylePages from '../Pages.module.css'
import React from 'react'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'
import {Center} from '../../components/layout/center/Center'
import {Button, ButtonType} from '../../components/UI/button/Button'
import {observer} from 'mobx-react-lite'
import {MainState} from '../../types/mainState/MainState'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const MoviesPage = observer((props: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        props.state.moviesPageState.showLoadMoreButton && props.state.loadMoreMovies(4)
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                <h2 style={DEFAULT_H2_PAGE_TITLE}>Available movies list</h2>

                <MovieGrid movies={props.state.moviesPageState.moviesCardsLoaded}
                           styles={{gridRowGap: '30px', marginTop: "50px"}}
                />

                {
                    props.state.moviesPageState.loading === LoadingState.LOADING
                    &&
                    <Center styles={{marginTop: '35px'}}><Loading/></Center>
                }

                {
                    props.state.moviesPageState.loading !== LoadingState.LOADING
                    &&
                    props.state.moviesPageState.showLoadMoreButton
                    &&
                    <Center styles={{marginTop: '35px'}}>
                        <Button text={'Load more'}
                                type={ButtonType.BUTTON_PRIMARY_FILLED}
                                onClick={() => props.state.loadMoreMovies(8)}
                        />
                    </Center>
                }
            </main>
        </div>
    )
})