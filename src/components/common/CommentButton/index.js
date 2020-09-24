import React from 'react';
import './style.scss';

const CommentButton = ({comment}) => {
    return (
        <div key={Math.random()} className="CommentButton" 
            onClick={()=>{}}>
            {comment && <i className="fas fa-comment"></i>}
            {!comment && <i className="far fa-comment"></i>}
        </div>
    )
}

export default CommentButton;