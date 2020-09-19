import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '@modules/auth';
import { useHistory } from 'react-router-dom';
import { check } from '@modules/user';
import LoginForm from '@components/LoginForm';

const LoginFormContainer = ({size="default"}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const { form, auth, authError, user } = useSelector(({auth, user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const { id, password } = form;

    const onHandleChange = useCallback(e => {
        e.preventDefault();
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({id, password}));
    }

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            alert('로그인에 실패했습니다.');
            console.error(authError);
            return;
        }
        if (auth && !user) {
            console.log(auth);
            // alert('로그인 되었습니다.');
            dispatch(check());
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if(user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            }
            catch (e) {
                console.log(e);
            }
        }
    }, [history, user]);

    return (
        <LoginForm form={form} onHandleChange={onHandleChange} onSubmit={onSubmit} size={size}/>
    );
}

export default LoginFormContainer;