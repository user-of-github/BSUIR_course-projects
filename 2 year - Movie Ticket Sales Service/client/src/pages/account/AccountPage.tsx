import {observer} from 'mobx-react-lite'
import StylePages from '../Pages.module.css'
import {MainState} from '../../types/mainState/MainState'
import React from 'react'


export const AccountPage = observer(({state}: {state?: MainState}): JSX.Element => {
    const [ firstName, setFirstName] = React.useState<string>('')
    const [ lastName, setLastName] = React.useState<string>('')
    const [ username, setUsername] = React.useState<string>('')
    const [ email, setEmail] = React.useState<string>('')
    const [ dateJoined, setDateJoined] = React.useState<string>('')
    const [ error, setError] = React.useState<any>()

    React.useEffect(() => {
        fetch('/api/user')
            .then(response => {
                if (response.ok) {
                    console.log(response)
                    return response.json()
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .then(({data}) => {
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setUsername(data.username)
                setEmail(data.email)
                setDateJoined(data.date_joined)
            })
            .catch(error => {
                console.log(error)
                setError('Ошибка, подробности в консоли')
            })
    }, [])

    return (
        <div className={StylePages.smoothLoading}>
            <main className={StylePages.main}>
                {error?
                    <p>{error}</p>
                    :
                    <div className="Profile">
                        <h1>{firstName} {lastName}</h1>
                        <h2>{username}</h2>
                        <p>email: {email}</p>
                        <p>Профиль создан {dateJoined}</p>
                    </div>
                }
            </main>
        </div>
    )
})