import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from '@modules/auth';
import loading from '@modules/request';
import user, { userSaga } from '@modules/user';
import post, { postSaga } from '@modules/post';
import posts, { postsSaga } from '@modules/posts';
import comment, { commentSaga } from '@modules/comment';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    post,
    posts,
    comment,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(), 
    postSaga(), 
    postsSaga(),
    commentSaga(),
  ])
}

export default rootReducer;