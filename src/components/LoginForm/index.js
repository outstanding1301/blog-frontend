import React, { Fragment } from 'react';
import './style.scss';
import InputAndHint from '@components/common/InputAndHint';
import { Link } from 'react-router-dom';

const LoginForm = ({form, onHandleChange, onSubmit, size='default'}) => {
    const {id, password} = form;

    const defaultForm = 
        <>
            {/* <div className="LoginForm__login_background"></div> */}
            <div className="LoginForm__login_frame">
                <div className="LoginForm__login_title_container">
                    <p className="LoginForm__login_register">아직 계정이 없으세요?</p>
                    <Link to="/register" className="LoginForm__login_register_link">회원가입 <i className="fas fa-angle-right"></i></Link>
                    <h2 className="LoginForm__login_title_text">로그인</h2>
                </div>
                <div className="LoginForm__login_form_container">
                    <InputAndHint name="id" label="Username 또는 이메일" type="text" autoComplete="username" value={id} iconLeft="fas fa-user" placeHolder="Username 또는 E-mail을 입력하세요." onChange={onHandleChange}/>
                    <InputAndHint name="password" label="비밀번호" type="password" autoComplete="password" value={password} iconLeft="fas fa-key" placeHolder="비밀번호를 입력하세요." onChange={onHandleChange}/>
                    
                    <button className="LoginForm__login_button button is-primary" onClick={onSubmit}>로그인</button>
                </div>
            </div>
        </>;

    const smallForm = 
        <>
            {/* <div className="LoginForm__login_background"></div> */}
            <div className="LoginForm__login_frame_small">
                <div className="LoginForm__login_form_container_small">
                    <InputAndHint name="id" label="Username 또는 이메일" type="text" autoComplete="username" value={id} iconLeft="fas fa-user" placeHolder="Username 또는 E-mail을 입력하세요." onChange={onHandleChange}/>
                    <InputAndHint name="password" label="비밀번호" type="password" autoComplete="password" value={password} iconLeft="fas fa-key" placeHolder="비밀번호를 입력하세요." onChange={onHandleChange}/>
                    
                    <button className="LoginForm__login_button_small button is-primary" onClick={onSubmit}>로그인</button>
                    <div className="LoginForm__register_div">
                        <p className="LoginForm__login_register_small">아직 계정이 없으세요?</p>
                        <Link to="/register" className="LoginForm__login_register_link_small">회원가입 <i className="fas fa-angle-right"></i></Link>
                    </div>
                </div>
            </div>
        </>;

    return (
        <Fragment>
            {(size != 'small') && defaultForm}
            {(size == 'small') && smallForm}
        </Fragment>
    );
}

export default LoginForm;