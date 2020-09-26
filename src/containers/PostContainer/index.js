import React, { useEffect } from 'react';
import Post from '@components/common/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, setPost, initializePost, deletePost } from '@modules/post';
import { useHistory } from 'react-router-dom';

const PostContainer = ({id, author, inPage, storedPost}) => {
    const {user, post, posts, postError, postRemoved, deletePostError} = useSelector(({user, post, posts}) => ({
        post: post.post,
        postError: post.postError,
        postRemoved: post.deletePost,
        posts: posts.posts,
        postsError: posts.postsError,
        deletePostError: post.deletePostError,
        user: user.user
    }));

    const dispatch = useDispatch();
    const history = useHistory();

    const onDelete = () => {
        if (user && user.username == author) {
            // dispatch(deletePost({id}));
        }
        else {
            // TODO: 작성자 아님
        }
    }

    useEffect(()=>{
        let postStored = posts.filter(p => p.id == id && p.username == author);
        if (storedPost) {

        }
        else if(postStored.length > 0) {
            dispatch(setPost(postStored[0]));
        }
        else {
            dispatch(getPost({id, author}));
        }
        return ()=>{
            dispatch(initializePost());
        }
    }, [])

    useEffect(()=>{
        if(deletePostError) {
            console.log(deletePostError);
            return;
        }
        if(postRemoved) {
            dispatch(initializePost());
            history.push('/');
        }
    }, [postRemoved, deletePostError]);

    useEffect(()=>{
        if(postError) {
            console.log(postError);
            return;
        }
        if(post) {

        }
    }, [post, postError]);

    return (
        ((storedPost || post) && 
            <Post post={storedPost ? storedPost : post} inPage={inPage} onDelete={onDelete}/>
        )
    );
}

export default PostContainer;