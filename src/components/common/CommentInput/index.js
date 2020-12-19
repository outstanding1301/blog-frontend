import { writeComment } from '@modules/comment';
import { updatePost } from '@modules/posts';
import { setPost } from '@modules/post';
import { getPost } from '@src/lib/api/post';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

const CommentInput = ({post, comment, onCommentChange, clear}) => {
    const {writeCommentData, writeCommentErrorData} = useSelector(({comment}) => ({
        writeCommentData: comment.writeComment,
        writeCommentErrorData: comment.writeCommentError
    }));

    const dispatch = useDispatch();
    const onSubmitComment = () => {
        const postId = post.id;
        dispatch(writeComment({postId, comment}));
    }

    useEffect(()=>{
        if (writeCommentData != null && writeCommentData.postId == post.id) {
            getPost(post).then(res => {
                dispatch(updatePost(res.data));
                dispatch(setPost(res.data));
            });
            clear();
        }
    }, [writeCommentData]);

    return (
        <div className="CommentInput">
            <input className="CommentInput__input" type="text" autoComplete="false" placeholder="댓글 달기..." value={comment} onChange={onCommentChange}/>
            <button className="CommentInput__submit" disabled={comment==""} onClick={onSubmitComment}>게시</button>
        </div>
    )
}

export default CommentInput;