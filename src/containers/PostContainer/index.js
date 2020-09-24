import React, { useEffect } from 'react';
import Post from '@components/common/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, initializePost } from '@modules/post';

const PostContainer = ({id, author}) => {
    const {post, postError} = useSelector(({post}) => ({
        post: post.post,
        postError: post.postError
    }));

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPost({id, author}));
        return ()=>{
            dispatch(initializePost());
        }
    }, [])

    useEffect(()=>{
        if(postError) {
            console.log(postError);
            return;
        }
        if(post) {
            console.log(post);
        }
    }, [post, postError]);

    return (
        (post && 
            <Post post={post}/>
        )
    );
}

export default PostContainer;