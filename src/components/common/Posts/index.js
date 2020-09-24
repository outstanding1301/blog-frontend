import React from 'react';
import './style.scss';
import Post from '@components/common/Post';
import PostBottom from '../PostBottom';

const Posts = ({posts}) => {

    return (
        <div className="Posts__container">
            {posts.map((post, i) => (
                <div className="Posts__postContainer">
                    <Post key={i} post={post}/>
                    <PostBottom post={post}/>
                </div>
            ))}
        </div>
    );
}

export default Posts;