import React from 'react';
import './style.scss';

const BookmarkButton = ({bookmark}) => {
    return (
        <div key={Math.random()} className="BookmarkButton" 
            onClick={()=>{}}>
            {bookmark && <i className="fas fa-bookmark"></i>}
            {!bookmark && <i className="far fa-bookmark"></i>}
        </div>
    )
}

export default BookmarkButton;