import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useDispatch, useSelector } from 'react-redux';
import { writePost, changeField, initializePost } from '@modules/post';
import { useHistory } from 'react-router-dom';
import client from '@src/lib/client';
import { api } from '@src/consts';

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

    const imageRef = useRef();

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
            bounds: "#quill-editor"
        });

        document.querySelector('.ql-tooltip-editor input').setAttribute("data-link", "https://outstandingboy.com");
        
        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChangeField({key: 'contents', value: quill.root.innerHTML});
            }
        });
        quill.getModule('toolbar').addHandler('image', onClickImageBtn);

    }, [onChangeField]);

    const onChangeTitle = e => {
        onChangeField({key: 'title', value: e.target.value});
    }

    const onClickImageBtn = useCallback(() => {
        console.log("onClickImageBtn");
        imageRef.current.click()
    },[imageRef.current]);

    const onChangeImageInput = (e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f)
        });

        e.target.value = '';

        client.post('/img', imageFormData, {
            headers: { 
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            const url = api+"/"+res.data;
            const range = quillInstance.current.getSelection();
            quillInstance.current.insertEmbed(range.index, 'image', url);
        });
  }

    return (
        <div className="editor__container">
            <input hidden type="file" onChange={onChangeImageInput} ref={imageRef}/>
                <div className="editor__buttons">
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
                <div className="editor__tools">
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().header == 1)
                                quillInstance.current.format('header', 0);
                            else
                                quillInstance.current.format('header', 1);
                        }
                    }>
                        <div>H<span>1</span></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().header == 2)
                                quillInstance.current.format('header', 0);
                            else
                                quillInstance.current.format('header', 2);
                        }
                    }>
                        <div>H<span>2</span></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().bold)
                                quillInstance.current.format('bold', false);
                            else
                                quillInstance.current.format('bold', true);
                        }
                    }>
                        <div><i className="fas fa-bold"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().italic)
                                quillInstance.current.format('italic', false);
                            else
                                quillInstance.current.format('italic', true);
                        }
                    }>
                        <div><i className="fas fa-italic"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().underline)
                                quillInstance.current.format('underline', false);
                            else
                                quillInstance.current.format('underline', true);
                        }
                    }>
                        <div><i className="fas fa-underline"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().strike)
                                quillInstance.current.format('strike', false);
                            else
                                quillInstance.current.format('strike', true);
                        }
                    }>
                        <div><i className="fas fa-strikethrough"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().list == 'ordered')
                                quillInstance.current.format('list', '');
                            else
                                quillInstance.current.format('list', 'ordered');
                        }
                    }>
                        <div><i className="fas fa-list-ol"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().list == 'bullet')
                                quillInstance.current.format('list', '');
                            else
                                quillInstance.current.format('list', 'bullet');
                        }
                    }>
                        <div><i className="fas fa-list-ul"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat().blockquote)
                                quillInstance.current.format('blockquote', false);
                            else
                                quillInstance.current.format('blockquote', true);
                        }
                    }>
                        <div><i className="fas fa-quote-right"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            if (quillInstance.current.getFormat()['code-block'])
                                quillInstance.current.format('code-block', false);
                            else
                                quillInstance.current.format('code-block', true);
                        }
                    }>
                        <div><i className="fas fa-code"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            document.querySelector('.ql-link').click();
                        }
                    }>
                        <div><i className="fas fa-link"></i></div>
                    </button>
                    <button className="editor__tools_tool" onClick={
                        ()=>{
                            document.querySelector('.ql-image').click();
                        }
                    }>
                        <div><i className="fas fa-image"></i></div>
                    </button>
                </div>
                <div className="editor__editor">
                    <div id="quill-editor" ref={quillElement}>

                    </div>
                </div>
        </div>
    );
}

export default Editor;