import {observer} from 'mobx-react-lite'
import {SearchPageState} from '../../types/mainState/SearchPageState'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {MovieGrid} from '../../components/movieGrid/MovieGrid'
import {NotFound} from '../../components/notFound/NotFound'
import React from 'react'
import {MainState} from '../../types/mainState/MainState'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const SearchPage = observer((props: { state: MainState }): JSX.Element => {
    const [query, setQuery] = React.useState<string>('')

    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        const urlQuery: string = new URLSearchParams(window.location.search).get('query') || ''

        setQuery(urlQuery)

        if (urlQuery !== '')
            props.state.searchByQuery(urlQuery)
        else
            props.state.searchPageState.loading = LoadingState.LOADED

    }, [])

    return (
        <>
            {
                props.state.searchPageState.loading === LoadingState.LOADING
                    ?
                    <Loading/>
                    :
                    props.state.searchPageState.foundMovies.length > 0
                        ?
                        <>
                            <h2 style={{...DEFAULT_H2_PAGE_TITLE, marginBottom: '40px', marginTop: '40px', fontWeight: 100}}>
                                On request "{query}" found {props.state.searchPageState.foundMovies.length} results
                            </h2>
                            <MovieGrid movies={props.state.searchPageState.foundMovies}
                                       styles={{gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'}}
                            />
                        </>
                        :
                        <NotFound/>
            }
        </>
    )
})