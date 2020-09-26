import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import * as postAPI from '@lib/api/post';

import createRequestSaga, { createRequestActionTypes } from '@lib/createRequestSaga';

const CHANGE_FIELD = 'post/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('post/WRITE_POST');
const [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE] = createRequestActionTypes('post/DELETE_POST');
const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] = createRequestActionTypes('post/GET_POST');
const INITIALIZE_POST = 'post/INITIALIZE_POST';
const SET_POST = 'post/SET_POST';

export const changeField = createAction(CHANGE_FIELD,
    ({ key, value }) => {
        return ({
            key, value
        })
    }
);

export const initializePost = createAction(INITIALIZE_POST);

export const writePost = createAction(WRITE_POST, ({title, contents}) => ({title, contents}));
export const deletePost = createAction(DELETE_POST, ({id}) => ({id}));
export const getPost = createAction(GET_POST, ({id, author}) => ({id, author}));
export const setPost = createAction(SET_POST, (post) => (post));

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const getPostSaga = createRequestSaga(GET_POST, postAPI.getPost);
const deletePostSaga = createRequestSaga(DELETE_POST, postAPI.deletePost);

export function* postSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(DELETE_POST, deletePostSaga);
}

const initialState = {
    post: null,
    postError: null,
    writePost: null,
    writePostError: null,
    deletePost: false,
    deletePostError: null,
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
        [INITIALIZE_POST]: state => ({
            ...state,
            post: null,
            postError: null,
            writePost: null,
            writePostError: null,
            deletePost: false,
            deletePostError: null,
            title: '',
            contents: '',
        }),
        [WRITE_POST_FAILURE]: (state, payload) => ({
            ...state,
            writePost: null,
            writePostError: payload
        }),
        [WRITE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            writePost: post,
            writePostError: null
        }),
        [GET_POST_FAILURE]: (state, payload) => ({
            ...state,
            post: null,
            postError: payload
        }),
        [GET_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post: post,
            postError: null,
        }),
        [DELETE_POST_FAILURE]: (state, payload) => ({
            ...state,
            deletePost: false,
            deletePostError: payload
        }),
        [DELETE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            deletePost: true,
            deletePostError: null
        }),
        [SET_POST]: (state, {payload: post}) => ({
            ...state,
            post: post,
            postError: null,
        }),
    }, initialState
);

export default postReducer;