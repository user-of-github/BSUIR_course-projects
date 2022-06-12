import React from 'react'
import StylePages from '../Pages.module.css'
import {LoadingState} from '../../types/LoadingState'
import {Loading} from '../../components/UI/loading/Loading'
import {MainState} from '../../types/mainState/MainState'
import {MovieInfoModule} from '../../components/movieInfoModule/MovieInfoModule'
import {observer} from 'mobx-react-lite'
import {NotFound} from '../../components/UI/notFound/NotFound'
import {AddComment} from '../../components/addComment/AddComment'
import {CommentBlock} from '../../components/comment/CommentBlock'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const MoviePage = observer((props: { state: MainState }): JSX.Element => {
    React.useEffect((): void => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        const id: string = new URLSearchParams(window.location.search).get('id') || ''
        props.state.loadMovie(id)
    }, [props.state])

    const addComment = (comment: string): void => {
        props.state.user !== null && props.state.addComment(props.state.moviePageState.movie!.movie_id, comment)
    }


    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                {
                    props.state.moviePageState.loading === LoadingState.LOADING
                        ?
                        <Loading/>
                        :
                        props.state.moviePageState.movie === null
                            ?
                            <NotFound/>
                            :
                            <>
                                <MovieInfoModule state={props.state}/>
                                {
                                    props.state.user !== null
                                        ?
                                        <AddComment onSend={addComment}/>
                                        :
                                        <h2 style={{...DEFAULT_H2_PAGE_TITLE, fontWeight: 100, fontSize: 30}}>
                                            Only authorized users can leave comments
                                        </h2>
                                }
                                <br/>
                                <br/>
                                {
                                    props.state.moviePageState.comments.map((item, index) => (
                                        <CommentBlock comment={item} key={`${item.comment}${item.username}${index}`}/>
                                    ))
                                }
                            </>
                }
            </main>
        </div>
    )
})