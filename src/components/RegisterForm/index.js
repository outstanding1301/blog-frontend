import React, { Fragment, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import {api, salt} from '../../consts';
import crypto from 'crypto';
import './style.scss';
import { useHistory } from 'react-router-dom';
import InputAndHint from '../common/InputAndHint';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';

const RegisterForm = (props) => {
    const history = useHistory();
    
    const dispatch = useDispatch();
    // const {form} = useSelector(({auth}) => ({
    //     form: auth.register
    // }));

    const form = useSelector(state => state.auth.register);
    console.log(form);

    const {username, nickname, email, password, passwordConfirm} = form;

    const onHandleChange = useCallback(e => {
        if(e.target.name === 'username') {
            e.target.value = e.target.value.replace(/[^a-z0-9_]/gi, '');
            if(e.target.value.length > 15) return;
        }
        else if(e.target.name === 'nickname') {
            if(e.target.value.length > 15) return;
        }
        else if(e.target.name === 'email') {
            if(e.target.value.length > 50) return;
        }
        else if(e.target.name === 'password' || e.target.name === 'passwordConfirm') {
            e.target.value = e.target.value.replace(/\s/, '');
            if(e.target.value.length > 20) return;
        }
        const {name, value} = e.target;
        dispatch(
            changeField(
            {
                form: 'register',
                key: name,
                value
            }
        ));
    }, []);

    const checkValidUsername = useCallback(() => {
        if(username.length < 3) {
            return 'Username이 너무 짧습니다.';
        }

        if(username.search(/\s/) === 0) {
            return 'Username에 공백을 포함할 수 없습니다.';
        }
        return '';
    }, [username]);

    const checkValidEmail = useCallback(() => {
        if(email.length < 3) {
            return 'E-mail이 너무 짧습니다.';
        }
        if(email.search(/\s/) === 0) {
            return 'E-mail에 공백을 포함할 수 없습니다.';
        }
        if(!/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(email)) {
            return '유효하지 않은 E-mail 형식입니다. (example@domain.com)';
        }
        return '';
    }, [email]);

    const checkValidPassword = useCallback(() => {
        if(password.length < 6) {
            return '비밀번호는 6자리 ~ 20자리 이내로 입력해주세요.';
        }
        if(password.search(/\s/) === 0) {
            return '비밀번호에 공백을 포함할 수 없습니다.';
        }
        if(password.search(/[0-9]/g) < 0 || password.search(/[a-zA-Z]/gi) < 0) {
            return '영문과 숫자를 혼합하여 입력해주세요.';
        }
        return '';
    }, [password]);

    const checkValidPasswordConfirm = useCallback(() => {
        if(password !== passwordConfirm) {
            return '비밀번호를 다시 확인해주세요.';
        }
        return '';
    }, [password, passwordConfirm]);

    const checkValidNickname = useCallback(() => {
        if(nickname.length < 1) {
            return '닉네임이 너무 짧습니다.';
        }
        if(nickname.search(/\s/) == 0) {
            return '닉네임에 공백을 포함할 수 없습니다.';
        }
        return '';
    }, [nickname]);

    const onClickRegister = (e) => {
        let pw = crypto.pbkdf2Sync(password, salt, 112, 64, 'sha512').toString('base64');
        axios.post(api+'/auth/register', {
            username: username,
            password: pw,
            email: email,
            nickname: nickname,
        }, {
            withCredentials: true
        }).then(data => {
            console.dir(data.data);
            alert('가입 성공!');
        }).catch(err => {
            console.error(err.response.data);
            alert('가입 실패!');
        })
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    const onClickLogin = useCallback((e) => {
        history.push('/login');
    }, []);

    const checkEmailMemo = useMemo(() => checkValidEmail(), [email]);
    const checkUsernameMemo = useMemo(() => checkValidUsername(), [username]);
    const checkPasswordMemo = useMemo(() => checkValidPassword(), [password]);
    const checkPasswordConfirmMemo = useMemo(() => checkValidPasswordConfirm(), [password, passwordConfirm]);
    const checkNicknameMemo = useMemo(() => checkValidNickname(), [nickname]);

    return (
        <Fragment>
            <div className="register_background"></div>
            <div className="register_frame">
                <div className="register_title_container">
                    <p className="register_login">이미 계정이 있으세요?</p>
                    <a href="/login" className="register_login_link">로그인 <i className="fas fa-angle-right"></i></a>
                    <h2 className="register_title_text">회원가입</h2>
                </div>

                <div className="register_form_container">
                    <InputAndHint name="email" label="E-mail" type="text" value={email} necessary iconLeft="fas fa-envelope" placeHolder="E-mail을 입력하세요." memo={checkEmailMemo} onChange={onHandleChange}/>
                    <InputAndHint name="username" label="Username" type="text" value={username} necessary iconLeft="fas fa-user" placeHolder="Username을 입력하세요." memo={checkUsernameMemo} onChange={onHandleChange}/>
                    <InputAndHint name="password" label="비밀번호" type="password" value={password} necessary iconLeft="fas fa-key" placeHolder="비밀번호를 입력하세요." memo={checkPasswordMemo} onChange={onHandleChange}/>
                    <InputAndHint name="passwordConfirm" label="비밀번호 확인" type="password" value={passwordConfirm} necessary iconLeft="fas fa-key" placeHolder="비밀번호를 다시 입력하세요." memo={checkPasswordConfirmMemo} onChange={onHandleChange}/>
                    <InputAndHint name="nickname" label="닉네임" type="text" value={nickname} necessary iconLeft="far fa-grin-tongue-squint" placeHolder="닉네임을 입력하세요." memo={checkNicknameMemo} onChange={onHandleChange}/>
                    <button className={`button is-link register_button`} disabled={checkEmailMemo.length+checkNicknameMemo.length+checkPasswordMemo.length+checkUsernameMemo.length+checkPasswordConfirmMemo.length !== 0} onClick={onClickRegister}>회원가입</button>
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterForm;