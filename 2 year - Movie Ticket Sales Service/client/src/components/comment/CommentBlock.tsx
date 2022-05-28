import Style from './Comment.module.css'
import {Comment} from '../../types/Comment'


export const CommentBlock = (props: {comment: Comment}): JSX.Element => (
    <div className={Style.comment}>
        <h4>@ {props.comment.username}</h4>
        <p>{props.comment.comment}</p>
    </div>
)