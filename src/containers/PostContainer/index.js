import React, { useEffect } from 'react';
import Post from '@components/common/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, setPost, initializePost, deletePost, setDeletePost } from '@modules/post';
import { useHistory } from 'react-router-dom';
import { removePost } from '@modules/posts';

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
        console.log(user.id, author)
        if (user && user.id == author) {
            dispatch(deletePost({id}));
        }
        else {
            // TODO: 작성자 아님
        }
    }

    useEffect(()=>{
        let postStored = posts.filter(p => p.id == id && p.id == author);
        if (storedPost) {
            console.log("1");
        }
        else if(postStored.length > 0) {
            console.log("2");
            dispatch(setPost(postStored[0]));
        }
        else {
            console.log("3");
            dispatch(getPost({id}));
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
        if(postRemoved && postRemoved == id) {
            // alert("글이 삭제되었습니다.");
            console.log(postRemoved);
            // dispatch(removePost(postRemoved));
            dispatch(setDeletePost(null));
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