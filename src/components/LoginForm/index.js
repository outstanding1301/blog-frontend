import React, { Fragment, useState } from 'react';
import axios from 'axios';
import {api, salt} from '../../consts';
import crypto from 'crypto';
import './style.css';
import { useHistory } from 'react-router-dom';

const LoginForm = (props) => {
    
    const history = useHistory();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const onInputId = (e) => {
        setId(e.target.value);
    }

    const onInputPassword = (e) => {
        setPassword(e.target.value);
    }

    const onClickLogin = (e) => {
        let pw = crypto.pbkdf2Sync(password, salt, 112, 64, 'sha512').toString('base64');
        axios.post(api+'/login', {
            id: id,
            password: pw
        }).then(data => {
            console.log(data.data);
            alert(data.data.data);
        }).catch(err => {
            console.error(err);
            if(err.response)
                alert(err.response.data.data);
            else
                alert(err);
        })
    }

    const onClickRegister = (e) => {
        history.push('/register');
    }

    return (
        <Fragment>
            <div className="login_background"></div>
            <div className="login_frame">
                <div className="login_title_container">
                    <p className="login_register">아직 계정이 없으세요?</p>
                    <a href="/register" className="login_register_link">회원가입 <i className="fas fa-angle-right"></i></a>
                    <h2 className="login_title_text">로그인</h2>
                </div>
                <div className="login_form_container">
                    <div className="field">
                        <label className="label">Username 또는 이메일</label>
                        <div className="control has-icons-left">
                            <input className={`input`} type="text" placeholder="Username or E-mail" value={id} onChange={onInputId}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">비밀번호</label>
                        <div className="control has-icons-left">
                            <input className={`input`} type="password" placeholder="Password" value={password} onChange={onInputPassword}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-key"></i>
                            </span>
                        </div>
                    </div>
                    
                    <button className="button is-link login_button" onClick={onClickLogin}>로그인</button>
                    {/* <button className="button is-link is-inverted login_register_button" onClick={onClickRegister}>회원가입</button> */}
                </div>
            </div>
        </Fragment>
    );
}

export default LoginForm;