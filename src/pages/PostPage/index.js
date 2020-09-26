import React from 'react';
import Header from '@components/common/Header';
import PostContainer from '@containers/PostContainer';

const PostPage = ({match}) => {
    const {params} = match;
    return (
        <div>
            <Header/>
            <PostContainer id={params.postId} author={params.username} inPage={true}/>
        </div>
    )
}

export default PostPage;