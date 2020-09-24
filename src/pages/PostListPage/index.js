import React from 'react';
import Header from '@components/common/Header';
import PostsContainer from '@containers/PostsContainer';

const PostListPage = ({match}) => {
    const {params} = match;
    return (
        <div>
            <Header />
            <h1>User : {params.username}</h1>
            <PostsContainer author={params.username}/>
        </div>
    )
}

export default PostListPage;