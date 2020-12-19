import React, { useEffect } from 'react';
import Posts from '@components/common/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPosts, getOldPosts, getPosts } from '@modules/posts';
import { useHistory } from 'react-router-dom';

const PostsContainer = ({author}) => {
    const {newestPostId, oldestPostId, posts, postsError} = useSelector(({posts}) => ({
        posts: posts.posts,
        postsError: posts.postsError,
        newestPostId: posts.newestPostId, 
        oldestPostId: posts.oldestPostId,
    }));

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(newestPostId) {
            dispatch(getNewPosts(newestPostId, {author}));
        }
        else {
            dispatch(getPosts({author, limit: 10}));
        }
    }, []);

    useEffect(()=>{
        if(postsError) {
            console.log(postsError);
            return;
        }

        const onScroll = () => {
            const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            const clientHeight = document.documentElement.clientHeight;

            if(scrollTop + clientHeight == scrollHeight) {
                if(oldestPostId)
                    dispatch(getOldPosts(oldestPostId, {author}));
            }
        }
        window.addEventListener('scroll', onScroll);
        return ()=>{
            window.removeEventListener('scroll', onScroll);
        }

    }, [posts, postsError]);

    return (
        <>
        {
            posts.length > 0 && 
            <Posts posts={posts}/>
        }
        {
            posts.length == 0 &&
            <h1>글이 없습니다.</h1>
        }
        </>
    );
}

export default PostsContainer;