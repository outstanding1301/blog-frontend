import React, { createRef, useEffect, useState } from 'react';
import './style.scss';
import DateParser from '@src/lib/DateParser';
import { Link, useHistory } from 'react-router-dom';
import PostBottom from '../PostBottom';

const Post = ({post, inPage, onDelete}) => {
    const history = useHistory();
    const elemBody = createRef(null);
    const {title, nickname, username, contents, postedDate, updatedDate} = post;

    const [postedAt, setPostedAt] = useState(DateParser(postedDate));
    // const [updatedAt, setUpdatedAt] = useState(DateParser(updatedDate));

    const [fold, setFold] = useState(false);
    
    useEffect(()=>{
        const elemInstance = elemBody.current;
        elemInstance.innerHTML = contents;
        if(elemInstance.clientHeight > 300) {
            setFold(true);
        }
        else {
            setFold(false);
        }

        const clock = setInterval(()=>{
            setPostedAt(DateParser(postedDate));
            // setUpdatedAt(DateParser(updatedDate));
        }, 1000);
        return ()=>{
            clearInterval(clock);
        }
    }, []);

    const onClickAuthor = () => {
        history.push('/@'+username);
    }

    return (
        <div className={`Post__container${fold && !inPage ? '__fold' : ''}`}>
            {fold && !inPage &&
                    <div className="Post__unfold" onClick={()=>setFold(false)}>
                        <div className="Post__unfold_gradation">
                            <div className="Post__unfold_hint cant_drag">
                                <span className="Post__unfold_hind_text">펼치기 </span> <i className="fas fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
            }
            <div className="Post__title_container">
                {
                    inPage ? (
                        <h1 className="Post__title">{title}</h1>
                    ) : (
                        <Link style={{ textDecoration: 'none' }} to={`/@${username}/${post.id}`}>
                            <h1 className="Post__title">{title}</h1>
                        </Link>)
                }
                
            </div>
            <div className="Post__description">
                <p className="Post__author"><span className="Post__postby">Post by</span> 
                <span className="Post__nickname" onClick={onClickAuthor}>{nickname}</span>
                <span className="Post__username" onClick={onClickAuthor}>@{username}</span></p>
                <p className="Post__date">{postedAt}</p>
            </div>
            <div className="Post__body" ref={elemBody}></div>
            <div className="Post__buttons">
                    {(()=>
                        onDelete
                        ?
                        (
                        <>
                        <div className="Post__editButton" onClick={()=>{}}>
                            <i className="fas fa-edit cant_drag"></i>
                        </div>
                        <div className="Post__deleteButton" onClick={onDelete}>
                            <i className="fas fa-trash cant_drag"></i>
                        </div>
                        </>
                        )
                        :
                        (
                            <></>
                        )
                    )()}
                </div>
                <PostBottom post={post}/>
        </div>
    );
}

export default Post;