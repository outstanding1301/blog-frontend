import React from 'react';
import './style.scss';
import Header from '@components/common/Header';
import PostsContainer from '@containers/PostsContainer';
import { initializePosts } from '@modules/posts';
import { useDispatch } from 'react-redux';
import { usePreEffect } from '@src/lib/Hooks';

const PostListPage = ({match}) => {
    const {params} = match;
    const dispatch = useDispatch();

    usePreEffect(()=>{
        dispatch(initializePosts());
    });

    return (
        <div className="PostListPage">
            <Header preEffect={()=>{dispatch(initializePosts())}}/>
            <h1>User : {params.username}</h1>
            <div className="PostListPage__Posts">
                <PostsContainer author={params.username}/>
            </div>
        </div>
    )
}

export default PostListPage;