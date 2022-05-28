import React from 'react'
import {Button} from '../UI/button/Button'
import Style from './AddComment.module.css'
import {TextArea} from '../UI/textarea/TextArea'
import {DEFAULT_H2_PAGE_TITLE} from '../../utils/defaults'


export const AddComment = (props: {onSend: any}): JSX.Element => {
    const [comment, setComment] = React.useState<string>('')

    const onTextAreaChange = (value: string): void => setComment(value)

    const onSend = (): void => {
        if (comment.replace(/\s/g, '').trim() !== '')
            props.onSend(comment.trim())
         else
            window.alert('What is the sense of sending such kind of message ?')
    }


    return (
        <div className={Style.addComment}>
            <h3 style={{...DEFAULT_H2_PAGE_TITLE, fontWeight: 100, fontSize: 22, marginBottom: 20}}>
                What do you think about it ?
            </h3>
            <TextArea styles={{marginBottom: 30}}
                      onChange={onTextAreaChange}
            />
            <Button text={'Send'} onClick={onSend}/>
        </div>
    )
}