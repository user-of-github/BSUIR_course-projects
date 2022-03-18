import React from 'react'
import StylePages from '../Pages.module.css'
import {Core} from '../../types/Core'
import {ServerResponse} from '../../types/ServerResponse'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {RequestCallback} from '../../types/RequestCallback'


export const MoviePage = (props: { controller: Core }): JSX.Element => {
    const [loading, setLoading] = React.useState<LoadingState>(LoadingState.LOADING)

    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

        const id: string = new URLSearchParams(window.location.search).get('movie-id') || ''

        const onMovieLoad: RequestCallback = (data, error) => {
            setLoading(LoadingState.LOADED)

            if (error) throw new Error(error.message)

            const parsedResponse: ServerResponse = JSON.parse(data!)

            if (parsedResponse.success)
                console.log(JSON.parse(parsedResponse.data))
        }

        props.controller.getMovieById(id, onMovieLoad)
    }, [])


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                {
                    loading === LoadingState.LOADING
                        ?
                        <Loading/>
                        :
                        <></>
                }
            </main>
        </div>
    )
}