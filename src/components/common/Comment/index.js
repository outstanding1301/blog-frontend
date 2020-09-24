import React from 'react';
import './style.scss';

const Comment = ({comment}) => {
    const {user, content} = comment;
    return (
        <div className="Comment">
            <span className="Comment__author_nickname">{user.nickname}</span>
            <span className="Comment__author_username">@{user.username}</span>
            <span className="Comment__content">{content}</span>
        </div>
    )
}

export default Comment;