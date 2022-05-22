import {observer} from 'mobx-react-lite'
import {MainState} from '../../types/mainState/MainState'
import {Navigate} from 'react-router-dom'


export const UserPage = observer(({state}: {state: MainState}): JSX.Element => {
    return (
        <>
            {
                state.user === null
                ?
                    <Navigate to='/login'/>
                    :
                    <h2>Hello, {state.user.serverData.username}</h2>
            }
        </>
    )
})