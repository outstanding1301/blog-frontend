import React, { useEffect, useRef } from 'react';
import './style.scss';
import PostContainer from '@containers/PostContainer';
import PostBottom from '../PostBottom';

const Posts = ({posts}) => {
    return (
        <div className="Posts__container">
            {posts.map((post, i) => (
                <div key={"posts_"+i} className="Posts__postContainer">
                    <PostContainer id={post.id} author={post.author} inPage={false} storedPost={post}/>
                    <PostBottom post={post}/>
                </div>
            ))}
        </div>
    );
}

export default Posts;