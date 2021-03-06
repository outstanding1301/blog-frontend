import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '@src/lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '@lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('auth/LOGOUT');


// 액션
export const changeField = createAction(CHANGE_FIELD,
    ({ form, key, value }) => {
        return ({
            form, // register , login
            key,
            value
        })
    }
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);

export const register = createAction(REGISTER, ({username, password, email, nickname}) => ({
    username, password, email, nickname
}));

export const login = createAction(LOGIN, ({id, password}) => ({
    id, password
}));

export const logout = createAction(LOGOUT);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout);

export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

// 초기 상태
const initialState = {
    register: {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
    },
    login: {
        id: '',
        password: '',
    },
    auth: null,
    authError: null,
};

// 리듀서
const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => { // type: (state, action) => {return {}}, action은 payload 가짐
            return produce(state, draft => {
                draft[form][key] = value;
            });
        },
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
            auth: null,
            authError: null
        }),
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth
        }),
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error
        }),
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth
        }),
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error
        }),
        [LOGOUT_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth: null,
        }),
        [LOGOUT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error
        }),
    },
    initialState,
);

export default auth;