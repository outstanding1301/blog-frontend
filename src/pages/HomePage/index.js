import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@modules/auth';
import { check } from '@modules/user';
import LoginFormContainer from '@containers/LoginFormContainer';
import { Link } from 'react-router-dom';
import Toast from '@components/common/Toast';
import Header from '@components/common/Header';

const HomePage = (props) => {

    const { user } = useSelector(({user}) => ({
        user: user.user
    }));

    const dispatch = useDispatch();

    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    const onRefresh = (e) => {
        e.preventDefault();
        dispatch(check());
    }

    return (
        <div>
            <Header />
            <h1>
                Home
                {/* <br/>
                {user && (
                    <>
                        <span style={{color: 'blue'}}>{user.nickname}@{user.username}</span>
                        <button className="button is-link" onClick={onRefresh}>새로고침</button>
                        <button className="button is-link" onClick={onLogout}>로그아웃</button>
                    </>
                )}
                <br/>
                {!user && <LoginFormContainer size="small" />} */}
                <br/>
                <Link to="/login">Login Page</Link>
                <br/>
                <Link to="/register">Register Page</Link>
                <br/>
                <Link to="/write">Write Post Page</Link>
                <br/>
                <Link to="/@outstandingboy/0">Post Page</Link>
                <br/>
                <Link to="/@outstandingboy">Post List Page</Link>
                <br/>
            </h1>
        </div>
    )
}

export default HomePage;