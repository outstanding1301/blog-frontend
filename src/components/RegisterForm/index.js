import React, { Fragment, useState } from 'react';
import axios from 'axios';
import {api, salt} from '../../consts';
import crypto from 'crypto';
import './style.css';
import { useHistory } from 'react-router-dom';

const RegisterForm = (props) => {
    
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onInputUsername = (e) => {
        e.target.value = e.target.value.replace(/[^a-z0-9_]/gi, '');
        if(e.target.value.length <= 15) 
            setUsername(e.target.value);
    }

    const onInputNickname = (e) => {
        if(e.target.value.length <= 15) 
            setNickname(e.target.value);
    }

    const onInputEmail = (e) => {
        if(e.target.value.length <= 50) 
            setEmail(e.target.value);
    }

    const onInputPassword = (e) => {
        e.target.value = e.target.value.replace(/\s/, '');
        if(e.target.value.length <= 20) 
            setPassword(e.target.value);
    }

    const checkValidUsername = () => {
        if(username.length < 3) {
            return 'Username이 너무 짧습니다.';
        }

        if(username.search(/\s/) == 0) {
            return 'Username에 공백을 포함할 수 없습니다.';
        }
        return '';
    }

    const checkValidEmail = () => {
        if(email.length < 3) {
            return 'E-mail이 너무 짧습니다.';
        }
        if(password.search(/\s/) == 0) {
            return 'E-mail에 공백을 포함할 수 없습니다.';
        }
        if(!/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(email)) {
            return '유효하지 않은 E-mail 형식입니다. (example@domain.com)';
        }
        return '';
    }

    const checkValidPassword = () => {
        if(password.length < 6) {
            return '비밀번호는 6자리 ~ 20자리 이내로 입력해주세요.';
        }
        if(password.search(/\s/) == 0) {
            return '비밀번호에 공백을 포함할 수 없습니다.';
        }
        if(password.search(/[0-9]/g) < 0 || password.search(/[a-zA-Z]/gi) < 0) {
            return '영문과 숫자를 혼합하여 입력해주세요.';
        }
        return '';
    }

    const checkValidNickname = () => {
        if(nickname.length < 1) {
            return '닉네임이 너무 짧습니다.';
        }
        if(nickname.search(/\s/) == 0) {
            return '닉네임에 공백을 포함할 수 없습니다.';
        }
        return '';
    }

    const onClickRegister = (e) => {
        let pw = crypto.pbkdf2Sync(password, salt, 112, 64, 'sha512').toString('base64');
        axios.post(api+'/register', {
            username: username,
            password: pw,
            email: email,
            nickname: nickname
        }).then(data => {
            console.log(data.data);
            alert(data.data.data);
        }).catch(err => {
            console.error(err.response.data);
            alert(err.response.data.data);
        })
    }

    const onClickLogin = (e) => {
        history.push('/login');
    }

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
                            <input className={`input ${(checkValidEmail().length === 0 ? "" : "is-danger")}`} type="text" placeholder="E-mail을 입력하세요." value={email} onChange={onInputEmail}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span key={Math.random()} className="icon is-small is-right">
                                <i className={(checkValidEmail().length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                            </span>
                        </div>
                        <p className="help is-danger"> {checkValidEmail()}</p>
                    </div>
                    <div className="field">
                        <label className="label">Username<span className="necessary">*</span></label>
                        <div className="control has-icons-left has-icons-right">
                            <input className={`input ${(checkValidUsername().length === 0 ? "" : "is-danger")}`} type="text" placeholder="Username을 입력하세요." value={username} onChange={onInputUsername}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span key={Math.random()} className="icon is-small is-right">
                                <i className={(checkValidUsername().length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                            </span>
                        </div>
                        <p className="help is-danger"> {checkValidUsername()}</p>
                    </div>
                    <div className="field">
                        <label className="label">비밀번호<span className="necessary">*</span></label>
                        <div className="control has-icons-left has-icons-right">
                            <input className={`input ${(checkValidPassword().length === 0 ? "" : "is-danger")}`} type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onInputPassword}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-key"></i>
                            </span>
                            <span key={Math.random()} className="icon is-small is-right">
                                <i className={(checkValidPassword().length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                            </span>
                        </div>
                        <p className="help is-danger"> {checkValidPassword()}</p>
                    </div>
                    <div className="field">
                        <label className="label">닉네임<span className="necessary">*</span></label>
                        <div className="control has-icons-left has-icons-right">
                            <input className={`input ${(checkValidNickname().length === 0 ? "" : "is-danger")}`} type="text" placeholder="닉네임을 입력하세요." value={nickname} onChange={onInputNickname}/>
                            <span className="icon is-small is-left">
                                <i className="farte fa-grin-tongue-squint"></i>
                            </span>
                            <span key={Math.random()} className="icon is-small is-right">
                                <i className={(checkValidNickname().length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                            </span>
                        </div>
                        <p className="help is-danger"> {checkValidNickname()}</p>
                    </div>
                    
                    <button className={`button is-link register_button`} disabled={checkValidEmail().length+checkValidNickname().length+checkValidPassword().length+checkValidUsername().length !== 0} onClick={onClickRegister}>회원가입</button>
                    {/* <button className="button is-link is-inverted register_register_button" onClick={onClickLogin}>로그인</button> */}
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterForm;