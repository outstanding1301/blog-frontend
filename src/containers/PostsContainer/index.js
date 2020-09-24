import React, { useEffect } from 'react';
import Posts from '@components/common/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, initializePost } from '@modules/post';

const PostsContainer = ({author}) => {
    const {posts, postError} = useSelector(({post}) => ({
        posts: post.posts,
        postError: post.postError
    }));

    const dispatch = useDispatch();

    useEffect(()=>{
        if(postError) {
            console.log(postError);
            return;
        }
        if(posts.length > 0) {
            console.log(posts);
        }
    }, [posts, postError]);

    useEffect(()=>{
        console.log(author);
        dispatch(getPosts({author}));
    }, []);

    return (
        (posts.length > 0 && 
            <Posts posts={posts}/>
        )
    );
}

export default PostsContainer;