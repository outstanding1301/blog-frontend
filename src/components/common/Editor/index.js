import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useDispatch, useSelector } from 'react-redux';
import { writePost, changeField, initializeEditor } from '@modules/post';
import { useHistory } from 'react-router-dom';

const Editor = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const {user, post, postError, title, contents} = useSelector(({user, post}) => ({
        user: user.user,
        post: post.post,
        postError: post.postError,
        title: post.title,
        contents: post.contents,
    }));

    const onChangeField = useCallback(payload => 
            dispatch(changeField(payload))
        , [dispatch])
    const quillElement = useRef(null);
    const quillInstance = useRef(null);
    
    const onPost = () => {
        dispatch(writePost({title, contents}));
    }

    useEffect(()=>{
        return ()=>{
            dispatch(initializeEditor());
        }
    }, [dispatch])

    useEffect(() => {
        if(postError) {
            console.log(postError);
            return;
        }
        if(post) {
            console.log(post);
            history.push('/@'+user.username+'/'+post.payload.data.id);
        }
    }, [post, postError]);

    useEffect(()=>{
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요...',
            modules: {
                toolbar: [
                    [{header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list: 'ordered'}, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChangeField({key: 'contents', value: quill.root.innerHTML});
            }
        });
    }, [onChangeField]);

    const onChangeTitle = e => {
        onChangeField({key: 'title', value: e.target.value});
    }


    return (
        <div className="editor__container">
                <div className="editor__postButton">
                    <div className="postButton" onClick={onPost}>
                        <i className="fas fa-pencil-alt cant_drag"></i>
                    </div>
                </div>
                <div className="editor__input_title_container">
                    <input className="editor__input_title" type="text" placeholder="제목을 입력하세요." onChange={onChangeTitle} value={title}/>
                </div>
                <div className="editor__editor" ref={quillElement}/>
        </div>
    );
}

export default Editor;