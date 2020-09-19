import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import * as postAPI from '@lib/api/post';

import createRequestSaga, { createRequestActionTypes } from '@lib/createRequestSaga';

const CHANGE_FIELD = 'post/CHANGE_FIELD';
const INITIALIZE_EDITOR = 'post/INITIALIZE_EDITOR';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('post/WRITE_POST');

export const changeField = createAction(CHANGE_FIELD,
    ({ key, value }) => {
        return ({
            key, value
        })
    }
);

export const initializeEditor = createAction(INITIALIZE_EDITOR);

export const writePost = createAction(WRITE_POST, ({title, contents}) => ({title, contents}));

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.post);

export function* postSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
    post: null,
    postError: null,
    title: '',
    contents: '',
}

const postReducer = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => { // type: (state, action) => {return {}}, action은 payload 가짐
            return {
                ...state,
                [key]: value,
            }
        },
        [INITIALIZE_EDITOR]: state => initialState
        ,
        [WRITE_POST_FAILURE]: (state, payload) => ({
            ...state,
            post: null,
            postError: payload
        }),
        [WRITE_POST_SUCCESS]: (state, payload) => ({
            ...state,
            post: payload,
            postError: null,
        }),
    }, initialState
);

export default postReducer;