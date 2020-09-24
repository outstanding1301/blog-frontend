import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@modules/auth';
import { check } from '@modules/user';
import './style.scss';
import LoginFormContainer from '@containers/LoginFormContainer';
import { Link } from 'react-router-dom';
import Toast from '@components/common/Toast';
import Header from '@components/common/Header';
import PostsContainer from '@containers/PostsContainer';

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
        <div className="HomePage">
            <Header />
            <div className="HomePage__Posts">
                <PostsContainer />
            </div>
        </div>
    )
}

export default HomePage;