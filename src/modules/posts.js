import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '@lib/api/post';

import createRequestSaga, { createRequestActionTypes } from '@lib/createRequestSaga';

const [GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE] = createRequestActionTypes('posts/GET_POSTS');
const INITIALIZE_POSTS = 'posts/INITIALIZE_POSTS';

export const initializePosts = createAction(INITIALIZE_POSTS);

export const getPosts = createAction(GET_POSTS, ({author, isNew, id, limit}) => ({author, isNew, id, limit}));
export const getNewPosts = (newestPostId, {author}) => getPosts({author, isNew: true, id: newestPostId, limit: 10});
export const getOldPosts = (oldestPostId, {author}) => getPosts({author, isNew: false, id: oldestPostId, limit: 10});

const getPostsSaga = createRequestSaga(GET_POSTS, postAPI.getPosts);

export function* postsSaga() {
    yield takeLatest(GET_POSTS, getPostsSaga);
}

const initialState = {
    posts: [],
    postsError: null,
    newestPostId: null,
    oldestPostId: null,
}

const postsReducer = handleActions(
    {
        [INITIALIZE_POSTS]: state => (
            initialState
        ),
        [GET_POSTS_FAILURE]: (state, payload) => ({
            ...state,
            postsError: payload
        }),
        [GET_POSTS_SUCCESS]: (state, {payload: posts}) => ({
            ...state,
            posts: [...new Set([...state.posts, ...posts])].sort((a, b) => b.id - a.id),
            postsError: null,
            newestPostId: state.newestPostId === null ? posts[0] ? posts[0].id : null : Math.max(state.newestPostId, posts[0] ? posts[0].id : 0),
            oldestPostId: state.oldestPostId === null ? posts[posts.length-1] ? posts[posts.length-1].id : null : Math.min(state.oldestPostId, posts[posts.length-1] ? posts[posts.length-1].id : Number.MAX_VALUE),
        }),
    }, initialState
);

export default postsReducer;