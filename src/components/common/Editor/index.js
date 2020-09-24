import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useDispatch, useSelector } from 'react-redux';
import { writePost, changeField, initializePost } from '@modules/post';
import { useHistory } from 'react-router-dom';

const Editor = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const {user, post, writePostError, title, contents} = useSelector(({user, post}) => ({
        user: user.user,
        post: post.writePost,
        writePostError: post.writePostError,
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
            dispatch(initializePost());
        }
    }, [dispatch])

    useEffect(() => {
        if(writePostError) {
            console.log(writePostError);
            return;
        }
        if(post) {
            console.log(post);
            history.push('/@'+user.username+'/'+post.id);
            dispatch(initializePost());
        }
    }, [post, writePostError]);

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
                    {(()=>
                        title.length === 0 || contents.length === 0 || contents === '<p><br></p>'
                        ?
                        (
                        <div className="postButton__disabled">
                            <i className="fas fa-pencil-alt cant_drag"></i>
                        </div>
                        )
                        :
                        (
                        <div className="postButton" onClick={onPost}>
                            <i className="fas fa-pencil-alt cant_drag"></i>
                        </div>
                        )
                    )()}
                </div>
                <div className="editor__input_title_container">
                    <input className="editor__input_title" type="text" placeholder="제목을 입력하세요." onChange={onChangeTitle} value={title}/>
                </div>
                <div className="editor__editor" ref={quillElement}/>
        </div>
    );
}

export default Editor;