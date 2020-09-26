import React, { useEffect, useMemo } from 'react';
import Header from '@components/common/Header';
import PostsContainer from '@containers/PostsContainer';
import { initializePosts } from '@modules/posts';
import { batch, useDispatch } from 'react-redux';
import { usePreEffect } from '@src/lib/Hooks';

const PostListPage = ({match}) => {
    const {params} = match;
    const dispatch = useDispatch();

    usePreEffect(()=>{
        dispatch(initializePosts());
    });

    return (
        <div>
            <Header preEffect={()=>{dispatch(initializePosts())}}/>
            <h1>User : {params.username}</h1>
            <PostsContainer author={params.username}/>
        </div>
    )
}

export default PostListPage;