import React, { Fragment } from 'react';
import './style.scss';
import InputAndHint from '@components/common/InputAndHint';
import { Link } from 'react-router-dom';

const RegisterForm = ({form, memos, onHandleChange, onSubmit}) => {

    const {username, nickname, email, password, passwordConfirm} = form;

    const {checkEmailMemo, checkUsernameMemo, checkPasswordMemo, checkPasswordConfirmMemo, checkNicknameMemo} = memos;

    return (
        <Fragment>
            <div className="RegisterForm__register_background"></div>
            <div className="RegisterForm__register_frame">
                <div className="RegisterForm__register_title_container">
                    <p className="RegisterForm__register_login">이미 계정이 있으세요?</p>
                    <Link to="/login" className="RegisterForm__register_login_link">로그인 <i className="fas fa-angle-right"></i></Link>
                    <h2 className="RegisterForm__register_title_text">회원가입</h2>
                </div>

                <div className="RegisterForm__register_form_container">
                    <InputAndHint name="email" label="E-mail" type="text" autoComplete="email" value={email} necessary iconLeft="fas fa-envelope" placeHolder="E-mail을 입력하세요." memo={checkEmailMemo} onChange={onHandleChange}/>
                    <InputAndHint name="username" label="Username" type="text" autoComplete="username" value={username} necessary iconLeft="fas fa-user" placeHolder="Username을 입력하세요." memo={checkUsernameMemo} onChange={onHandleChange}/>
                    <InputAndHint name="password" label="비밀번호" type="password" autoComplete="new-password" value={password} necessary iconLeft="fas fa-key" placeHolder="비밀번호를 입력하세요." memo={checkPasswordMemo} onChange={onHandleChange}/>
                    <InputAndHint name="passwordConfirm" label="비밀번호 확인" type="password" autoComplete="new-password" value={passwordConfirm} necessary iconLeft="fas fa-key" placeHolder="비밀번호를 다시 입력하세요." memo={checkPasswordConfirmMemo} onChange={onHandleChange}/>
                    <InputAndHint name="nickname" label="닉네임" type="text" autoComplete="nickname" value={nickname} necessary iconLeft="far fa-grin-tongue-squint" placeHolder="닉네임을 입력하세요." memo={checkNicknameMemo} onChange={onHandleChange}/>
                    <button className="RegisterForm__register_button button is-primary register_button" onClick={onSubmit}>회원가입</button>
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterForm;