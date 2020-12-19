import React, { createRef, useEffect, useState } from 'react';
import './style.scss';
import Like from '@components/common/LikeButton';
import BookmarkButton from '@components/common/BookmarkButton';
import Comment from '@components/common/Comment';
import CommentInput from '../CommentInput';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '@src/lib/api/like';
import { getPost } from '@src/lib/api/post';
import { updatePost } from '@modules/posts';
import { setPost } from '@modules/post';

const PostBottom = ({post}) => {
    const [comment, setComment] = useState("");
    const {user} = useSelector(({user}) => ({
        user: user.user
    }));

    const like = post.likes.filter((l) => l.userId == user.id).length > 0;
    // const [like, setLike] = useState(liked);
    const dispatch = useDispatch();

    const onLikeChange = (val) => {
        const postId = post.id;
        likePost({postId})
        .then(res1 => {
            getPost(post).then(res => {
                dispatch(updatePost(res.data));
                dispatch(setPost(res.data));
            });
        });
    }

    const onCommentChange = (e) => {
        setComment(e.target.value);
    }

    return (
        <div className="Post__bottomContainer">
            <div className="Post__bottomItems">
                <Like like={like} count={post.likes.length} onLikeChange={onLikeChange}/>
                <div style={{display:'flex', width: '80px', justifyContent: 'space-between'}}>
                </div>
            </div>
            <div className="Post__comment_container">
                {post.comments.map(comment => <Comment comment={{user:{nickname: comment.nickname, username: comment.username}, content: comment.comment}}/>)}
                <div className="Post__comment__line"></div>
                <CommentInput post={post} comment={comment} onCommentChange={onCommentChange} clear={()=>setComment("")}/>
            </div>
        </div>
    );
}

export default PostBottom;