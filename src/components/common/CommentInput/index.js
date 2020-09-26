import React from 'react';
import './style.scss';

const CommentInput = ({comment}) => {
    const {user, content} = comment;
    return (
        <div className="CommentInput">
            <input className="CommentInput__input" type="text" autoComplete="false" placeholder="댓글 달기..."/>
            <button className="CommentInput__submit" disabled>게시</button>
        </div>
    )
}

export default CommentInput;