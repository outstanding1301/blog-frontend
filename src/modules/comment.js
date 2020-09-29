import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import * as postAPI from '@lib/api/post';
import * as commentAPI from '@lib/api/comment';
import * as likeAPI from '@lib/api/like';

import createRequestSaga, { createRequestActionTypes } from '@lib/createRequestSaga';

const CHANGE_FIELD = 'comment/CHANGE_FIELD';
const INITIALIZE_COMMENT = 'comment/INITIALIZE_POST';

// Comment
const [WRITE_COMMENT, WRITE_COMMENT_SUCCESS, WRITE_COMMENT_FAILURE] = createRequestActionTypes('comment/WRITE_COMMENT');
const [GET_COMMENTS, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE] = createRequestActionTypes('comment/GET_COMMENTS');
const [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE] = createRequestActionTypes('comment/DELETE_COMMENT');

export const changeField = createAction(CHANGE_FIELD,
    ({ key, value }) => {
        return ({
            key, value
        })
    }
);

export const initializeComment = createAction(INITIALIZE_COMMENT);

export const writeComment = createAction(WRITE_COMMENT, ({postId, comment}) => ({postId, comment}));
export const getComments = createAction(GET_COMMENTS, ({postId}) => ({postId}));
export const delteComment = createAction(DELETE_COMMENT, ({id}) => ({id}));

const writeCommentSaga = createRequestSaga(WRITE_COMMENT, commentAPI.writeComment);
const getCommentsSaga = createRequestSaga(GET_COMMENTS, commentAPI.getComments);
const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, commentAPI.deleteComment);

export function* commentSaga() {
    yield takeLatest(WRITE_COMMENT, writeCommentSaga);
    yield takeLatest(GET_COMMENTS, getCommentsSaga);
    yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
}

const initialState = {
    comment: '',
    writeComment: null,
    writeCommentError: null,
    comments: [],
    commentsError: null
}

const commentReducer = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => { // type: (state, action) => {return {}}, action은 payload 가짐
            return {
                ...state,
                [key]: value,
            }
        },
        [INITIALIZE_COMMENT]: state => (initialState),
        [WRITE_COMMENT_FAILURE]: (state, payload) => ({
            ...state,
            writeComment: null,
            writeCommentError: payload
        }),
        [WRITE_COMMENT_SUCCESS]: (state, {payload: comment}) => ({
            ...state,
            writeComment: comment,
            writeCommentError: null
        }),
        [GET_COMMENTS_FAILURE]: (state, payload) => ({
            ...state,
            comments: null,
            commentsError: payload
        }),
        [GET_COMMENTS_SUCCESS]: (state, {payload: comments}) => ({
            ...state,
            comments: comments,
            commentsError: null,
        }),
        [DELETE_COMMENT_FAILURE]: (state, payload) => ({
            ...state,
            deleteComment: false,
            deleteCommentError: payload
        }),
        [DELETE_COMMENT_SUCCESS]: (state, {payload: id}) => ({
            ...state,
            deleteComment: true,
            deleteCommentError: null
        }),
    }, initialState
);

export default commentReducer;