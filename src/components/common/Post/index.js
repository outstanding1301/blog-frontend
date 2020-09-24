import React, { createRef, useEffect, useState } from 'react';
import './style.scss';
import DateParser from '@src/lib/DateParser';
import { useHistory } from 'react-router-dom';
import Like from '@components/common/LikeButton';
import CommentButton from '@components/common/CommentButton';
import BookmarkButton from '@components/common/BookmarkButton';
import Comment from '@components/common/Comment';

const Post = ({post}) => {
    const history = useHistory();
    const elemBody = createRef(null);
    const {title, nickname, username, contents, postedDate, updatedDate} = post;

    const postedAt = DateParser(postedDate);
    const updatedAt = DateParser(updatedDate);

    const [fold, setFold] = useState(false);
    const [like, setLike] = useState(false);

    useEffect(()=>{
        const elemInstance = elemBody.current;
        elemInstance.innerHTML = contents;
        if(elemInstance.clientHeight > 300) {
            setFold(true);
        }
        else {
            setFold(false);
        }
    }, []);

    const onClickAuthor = () => {
        history.push('/@'+username);
    }

    const onLikeChange = (val) => {
        console.log(val);
        setLike(val);
    }

    return (
        <div className={`Post__container${fold ? '__fold' : ''}`}>
            {fold &&
                    <div className="Post__unfold" onClick={()=>setFold(false)}>
                        <div className="Post__unfold_gradation">
                            <div className="Post__unfold_hint">
                                <i className="fas fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
            }
            <div className="Post__title_container">
                <h1 className="Post__title">{title}</h1>
            </div>
            <div className="Post__description">
                <p className="Post__author"><span className="Post__postby">Post by</span> 
                <span className="Post__nickname" onClick={onClickAuthor}>{nickname}</span>
                <span className="Post__username" onClick={onClickAuthor}>@{username}</span></p>
                <p className="Post__date">{postedAt}</p>
            </div>
            <div className="Post__body" ref={elemBody}></div>
        </div>
    );
}

export default Post;