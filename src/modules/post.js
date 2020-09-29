import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import * as postAPI from '@lib/api/post';
import * as commentAPI from '@lib/api/comment';
import * as likeAPI from '@lib/api/like';

import createRequestSaga, { createRequestActionTypes } from '@lib/createRequestSaga';

const CHANGE_FIELD = 'post/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('post/WRITE_POST');
const [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE] = createRequestActionTypes('post/DELETE_POST');
const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] = createRequestActionTypes('post/GET_POST');
const INITIALIZE_POST = 'post/INITIALIZE_POST';
const SET_POST = 'post/SET_POST';
const SET_DELETE_POST = 'post/SET_DELETE_POST';

// Like
const [GET_LIKES, GET_LIKES_SUCCESS, GET_LIKES_FAILURE] = createRequestActionTypes('post/GET_LIKES');
const [LIKE_POST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE] = createRequestActionTypes('post/LIKE_POST');

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

export const setDeletePost = createAction(SET_DELETE_POST, (deleted) => (deleted));

export const likePost = createAction(LIKE_POST, ({postId}) => ({postId}));
export const getLikes = createAction(GET_LIKES, ({postId}) => ({postId}));

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const getPostSaga = createRequestSaga(GET_POST, postAPI.getPost);
const deletePostSaga = createRequestSaga(DELETE_POST, postAPI.deletePost);

const likePostSaga = createRequestSaga(LIKE_POST, likeAPI.likePost);
const getLikesSaga = createRequestSaga(GET_LIKES, likeAPI.getLikes);

export function* postSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(DELETE_POST, deletePostSaga);

    yield takeLatest(LIKE_POST, likePostSaga);
    yield takeLatest(GET_LIKES, getLikesSaga);
}

const initialState = {
    post: null,
    postError: null,
    writePost: null,
    writePostError: null,
    deletePost: null,
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
            // posts: state.posts.map(p => {
            //     if(p.id == post.id) return post;
            //     return p;
            // })
        }),
        [DELETE_POST_FAILURE]: (state, payload) => ({
            ...state,
            deletePost: null,
            deletePostError: payload
        }),
        [DELETE_POST_SUCCESS]: (state, {payload: id}) => ({
            ...state,
            deletePost: id,
            deletePostError: null,
        }),
        [SET_POST]: (state, {payload: post}) => ({
            ...state,
            post: post,
            postError: null,
        }),
        [SET_DELETE_POST]: (state, {payload: deleted}) => ({
            ...state,
            deletePost: deleted,
        }),
    }, initialState
);

export default postReducer;