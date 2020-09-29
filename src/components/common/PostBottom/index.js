import React, { createRef, useEffect, useState } from 'react';
import './style.scss';
import Like from '@components/common/LikeButton';
import CommentButton from '@components/common/CommentButton';
import BookmarkButton from '@components/common/BookmarkButton';
import Comment from '@components/common/Comment';
import CommentInput from '../CommentInput';

const PostBottom = ({post}) => {
    const [like, setLike] = useState(false);

    const onLikeChange = (val) => {
        console.log(val);
        setLike(val);
    }

    return (
        <div className="Post__bottomContainer">
            <div className="Post__bottomItems">
                <Like like={like} count={post.likes.length} onLikeChange={onLikeChange}/>
                <div style={{display:'flex', width: '80px', justifyContent: 'space-between'}}>
                    <CommentButton comment={like}/>
                    <BookmarkButton bookmark={like}/>
                </div>
            </div>
            <div className="Post__comment_container">
                {post.comments.map(comment => <Comment comment={{user:{nickname: comment.nickname, username: comment.username}, content: comment.comment}}/>)}
                <div className="Post__comment__line"></div>
                <CommentInput comment={{user:{nickname: '송인걸', username: 'outstandingboy'}, content: '댓글테스트'}}/>
            </div>
        </div>
    );
}

export default PostBottom;