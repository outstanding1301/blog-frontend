import React, { useEffect, useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginFormContainer from '@containers/LoginFormContainer';
import { logout } from '@modules/user';
import { getNewPosts } from '@modules/posts';

const Header = ({preEffect}) => {
    const history = useHistory();
    const {user, newestPostId} = useSelector(({user, posts}) => ({
        user: user.user,
        newestPostId: posts.newestPostId
    }));

    const dispatch = useDispatch();

    const [formOpen, setFormOpen] = useState(false);

    const onLogout = () => {
        dispatch(logout());
        alert("로그아웃 되었습니다.");
    }
    const onClickLogo = () => {
        if(preEffect) {
            preEffect();
        }
        if(history.location.pathname == '/') {
            if(newestPostId)
                dispatch(getNewPosts(newestPostId, {author: undefined}));
            else
                window.location.href = '/';
        }
        else {
            history.push('/');
        }
    }
    const onWritePost = () => {
        history.push('/write');
    }
    const onClickProfile = () => {
        history.push('/@'+user.username);
    }

    useEffect(()=>{
        if(user) {
            setFormOpen(false);
        }
    }, [user]);

    return (
        <header className="header__header">
            {formOpen &&
            <div className="header__loginForm" style={{visibility: user ? "hidden" : "visible"}}>
                <LoginFormContainer size="small" />
            </div>}
            <h1 className="header__logo cant_drag" onClick={onClickLogo}>outstargram<i className="fas fa-comment-dots header__icon"></i></h1>
            <div className="header__userInfo">
                {user && (
                    <>
                    <p className="header__button cant_drag" onClick={onWritePost}>글쓰기</p>
                    <p key={Math.random()} className="header__userName" onClick={onClickProfile}>
                        <span className="header__userName_nickname">{user.nickname}</span>
                        <span className="header__userName_username">@{user.username}</span>
                    </p>
                    <p className="header__button cant_drag" onClick={onLogout}>로그아웃 <i className="fas fa-sign-out-alt"></i></p>
                    </>
                )}

                {!user && (
                    <p className="header__button cant_drag" onClick={()=>setFormOpen(!formOpen)}>{formOpen ? "닫기" : "로그인"} <i className="fas fa-sign-in-alt"></i></p>
                )}
            </div>
        </header>
    );
}

export default Header;