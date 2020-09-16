import React, { Fragment, useCallback, useMemo, useReducer } from 'react';
import axios from 'axios';
import {api, salt} from '../../consts';
import crypto from 'crypto';
import './style.scss';
import { useHistory } from 'react-router-dom';

const reducer = (state, action) => {
    console.log('reducer');
    return {
        ...state,
        [action.name]: action.value
    }
}

const RegisterForm = (props) => {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, {
        username: '',
        nickname: '',
        email: '',
        password: ''
    });

    const {username, nickname, email, password} = state;

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
        else if(e.target.name === 'password') {
            e.target.value = e.target.value.replace(/\s/, '');
            if(e.target.value.length > 20) return;
        }
        dispatch(e.target);
    }, []);

    const checkValidUsername = useCallback(() => {
        console.log('username');
        if(username.length < 3) {
            return 'Username이 너무 짧습니다.';
        }

        if(username.search(/\s/) === 0) {
            return 'Username에 공백을 포함할 수 없습니다.';
        }
        return '';
    }, [username]);

    const checkValidEmail = useCallback(() => {
        console.log('email');
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
        console.log('pw');
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

    const checkValidNickname = useCallback(() => {
        console.log('nick');
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

    const onClickLogin = useCallback((e) => {
        history.push('/login');
    }, []);

    const checkEmailMemo = useMemo(() => checkValidEmail(), [email]);
    const checkUsernameMemo = useMemo(() => checkValidUsername(), [username]);
    const checkPasswordMemo = useMemo(() => checkValidPassword(), [password]);
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
                    <div className="field">
                        <label className="label">E-mail<span className="necessary">*</span></label>
                        <div className="control has-icons-left has-icons-right">
                            <input name="email" className={`input ${(checkEmailMemo.length === 0 ? "" : "is-danger")}`} type="text" placeholder="E-mail을 입력하세요." value={email} onChange={onHandleChange}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span key={Math.random()} className="icon is-small is-right">
                                <i className={(checkEmailMemo.length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                            </span>
                        </div>
                        <p className="help is-danger"> {checkEmailMemo}</p>
                    </div>
                    <div className="field">
                        <label className="label">Username<span className="necessary">*</span></label>
                        <div className="control has-icons-left has-icons-right">
                            <input name="username" className={`input ${(checkUsernameMemo.length === 0 ? "" : "is-danger")}`} type="text" placeholder="Username을 입력하세요." value={username} onChange={onHandleChange}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span key={Math.random()} className="icon is-small is-right">
                                <i className={(checkUsernameMemo.length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                            </span>
                        </div>
                        <p className="help is-danger"> {checkUsernameMemo}</p>
                    </div>
                    <div className="field">
                        <label className="label">비밀번호<span className="necessary">*</span></label>
                        <div className="control has-icons-left has-icons-right">
                            <input name="password" className={`input ${(checkPasswordMemo.length === 0 ? "" : "is-danger")}`} type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onHandleChange}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-key"></i>
                            </span>
                            <span key={Math.random()} className="icon is-small is-right">
                                <i className={(checkPasswordMemo.length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                            </span>
                        </div>
                        <p className="help is-danger"> {checkPasswordMemo}</p>
                    </div>
                    <div className="field">
                        <label className="label">닉네임<span className="necessary">*</span></label>
                        <div className="control has-icons-left has-icons-right">
                            <input name="nickname" className={`input ${(checkNicknameMemo.length === 0 ? "" : "is-danger")}`} type="text" placeholder="닉네임을 입력하세요." value={nickname} onChange={onHandleChange}/>
                            <span className="icon is-small is-left">
                                <i className="farte fa-grin-tongue-squint"></i>
                            </span>
                            <span key={Math.random()} className="icon is-small is-right">
                                <i className={(checkNicknameMemo.length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                            </span>
                        </div>
                        <p className="help is-danger"> {checkNicknameMemo}</p>
                    </div>
                    
                    <button className={`button is-link register_button`} disabled={checkEmailMemo.length+checkNicknameMemo.length+checkPasswordMemo.length+checkUsernameMemo.length !== 0} onClick={onClickRegister}>회원가입</button>
                    {/* <button className="button is-link is-inverted register_register_button" onClick={onClickLogin}>로그인</button> */}
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterForm;