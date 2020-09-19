import React, { useCallback, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '@modules/auth';
import { check } from '@modules/user';
import RegisterForm from '@components/RegisterForm';

const RegisterFormContainer = (props) => {
    const history = useHistory();
    
    const dispatch = useDispatch();
    const {form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

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

    const onSubmit = (e) => {
        e.preventDefault();
        if(checkEmailMemo.length > 0) {
            alert(checkEmailMemo);
            return;
        }
        else if (checkUsernameMemo.length > 0) {
            alert(checkUsernameMemo);
            return;
        }
        else if (checkPasswordMemo.length > 0) {
            alert(checkPasswordMemo);
            return;
        }
        else if (checkPasswordConfirmMemo.length > 0) {
            alert(checkPasswordConfirmMemo);
            return;
        }
        else if (checkNicknameMemo.length > 0) {
            alert(checkNicknameMemo);
            return;
        }
        dispatch(register({username, nickname, email, password}));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(() => {
        if(authError) {
            alert('회원가입에 실패했습니다.')
            console.log(authError);
            return;
        }
        if(auth && !user) {
            alert('회원가입에 성공했습니다.')
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);


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

    const checkEmailMemo = useMemo(() => checkValidEmail(), [email]);
    const checkUsernameMemo = useMemo(() => checkValidUsername(), [username]);
    const checkPasswordMemo = useMemo(() => checkValidPassword(), [password]);
    const checkPasswordConfirmMemo = useMemo(() => checkValidPasswordConfirm(), [password, passwordConfirm]);
    const checkNicknameMemo = useMemo(() => checkValidNickname(), [nickname]);

    const memos = {checkEmailMemo, checkUsernameMemo, checkPasswordMemo, checkPasswordConfirmMemo, checkNicknameMemo}

    return (
        <RegisterForm form={form} memos={memos} onHandleChange={onHandleChange} onSubmit={onSubmit}/>
    );
}

export default RegisterFormContainer;