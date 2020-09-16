import React, { Fragment, useReducer, useCallback } from 'react';
import axios from 'axios';
import {api, salt} from '../../consts';
import crypto from 'crypto';
import './style.scss';
import { useHistory } from 'react-router-dom';
import InputAndHint from '../common/InputAndHint';

const reducer = (state, action) => {
    return {
        ...state,
        [action.name]: action.value
    }
}
const LoginForm = (props) => {
    const history = useHistory();

    const [state, dispatch] = useReducer(reducer, {
        id: '',
        password: ''
    });

    const {id, password} = state;

    const onHandleChange = useCallback(e => {
        dispatch(e.target);
    }, []);

    const onClickLogin = (e) => {
        let pw = crypto.pbkdf2Sync(password, salt, 112, 64, 'sha512').toString('base64');
        axios.post(api+'/auth/login', {
            id: id,
            password: pw
        }, {
            withCredentials: true
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

    const onClickRegister = useCallback((e) => {
        history.push('/register');
    }, []);

    return (
        <Fragment>
            {/* <div className="login_background"></div> */}
            <div className="login_frame">
                <div className="login_title_container">
                    <p className="login_register">아직 계정이 없으세요?</p>
                    <a href="/register" className="login_register_link">회원가입 <i className="fas fa-angle-right"></i></a>
                    <h2 className="login_title_text">로그인</h2>
                </div>
                <div className="login_form_container">
                    <InputAndHint name="id" label="Username 또는 이메일" type="text" value={id} iconLeft="fas fa-user" placeHolder="Username 또는 E-mail을 입력하세요." onChange={onHandleChange}/>
                    <InputAndHint name="password" label="비밀번호" type="password" value={password} iconLeft="fas fa-key" placeHolder="비밀번호를 입력하세요." onChange={onHandleChange}/>
                    
                    <button className="button is-link login_button" onClick={onClickLogin}>로그인</button>
                </div>
            </div>
        </Fragment>
    );
}

export default LoginForm;