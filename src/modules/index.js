import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from '@modules/auth';
import loading from '@modules/request';
import user, { userSaga } from '@modules/user';
import post, { postSaga } from '@modules/post';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    post,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), postSaga()])
}

export default rootReducer;