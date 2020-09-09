import React, { Fragment, useState } from 'react';
import axios from 'axios';
import {api, salt} from '../../consts';
import crypto from 'crypto';
import './style.css';

const Login = (props) => {
    
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
            console.log(data);
            alert(data.data);
        }).catch(err => {
            console.error(err.response);
            alert(err.response.data);
        })
    }

    const onClickRegister = (e) => {
        let pw = crypto.pbkdf2Sync(password, salt, 112, 64, 'sha512').toString('base64');
        axios.post(api+'/user', {
            id: id,
            password: pw
        }).then(data => {
            console.log(data);
            alert(data.data);
        }).catch(err => {
            console.error(err.response);
            alert(err.response.data);
        })
    }

    return (
        <Fragment>
            <div className="login_background"></div>
            <div className="login_frame">
                <div className="login_title_container">
                    <h2 className="login_title_text">로그인</h2>
                </div>
                <div className="login_form_container">
                    <div className="field">
                        <label className="label">아이디</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="ID" value={id} onChange={onInputId}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">비밀번호</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" value={password} onChange={onInputPassword}/>
                        </div>
                    </div>
                    
                    <button className="button is-link login_button" onClick={onClickLogin}>로그인</button>
                    <button className="button is-link is-inverted login_register_button" onClick={onClickRegister}>회원가입</button>
                </div>

                {/* <div className="login_input_container">
                    <input className="input is-primary" type="text" placeholder="ID"></input>
                </div>
                <div className="login_input_container">
                    <input className="input is-primary" type="text" placeholder="Password"></input>
                </div> */}
            </div>
        </Fragment>
    );
}

export default Login;