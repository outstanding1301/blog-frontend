import React, { Fragment, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '@modules/auth';
import './style.scss';
import { useHistory } from 'react-router-dom';
import InputAndHint from '@components/common/InputAndHint';

const LoginForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const { form, auth, authError } = useSelector(({auth}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError
    }));
    // const form = useSelector(state => state.auth.login);

    const { id, password } = form;

    const onHandleChange = useCallback(e => {
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
            console.error(authError);
            return;
        }
        if (auth) {
            console.log(auth);
        }
    }, [auth, authError])

    const onClickRegister = useCallback((e) => {
        history.push('/register');
    }, []);

    return (
        <Fragment>
            {/* <div className="LoginForm__login_background"></div> */}
            <div className="LoginForm__login_frame">
                <div className="LoginForm__login_title_container">
                    <p className="LoginForm__login_register">아직 계정이 없으세요?</p>
                    <a href="/register" className="LoginForm__login_register_link">회원가입 <i className="fas fa-angle-right"></i></a>
                    <h2 className="LoginForm__login_title_text">로그인</h2>
                </div>
                <div className="LoginForm__login_form_container">
                    <InputAndHint name="id" label="Username 또는 이메일" type="text" value={id} iconLeft="fas fa-user" placeHolder="Username 또는 E-mail을 입력하세요." onChange={onHandleChange}/>
                    <InputAndHint name="password" label="비밀번호" type="password" value={password} iconLeft="fas fa-key" placeHolder="비밀번호를 입력하세요." onChange={onHandleChange}/>
                    
                    <button className="LoginForm__login_button button is-link login_button" onClick={onSubmit}>로그인</button>
                </div>
            </div>
        </Fragment>
    );
}

export default LoginForm;