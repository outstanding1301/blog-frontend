import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from '@modules/auth';
import loading from '@modules/request';
import user, { userSaga } from '@modules/user';
import post, { postSaga } from '@modules/post';

// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// const persistConfig = {
//   key: 'root',
//   storage
// };

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    post,
});

// const enhancedReducer = persistReducer(persistConfig, rootReducer);

export function* rootSaga() {
  yield all([authSaga(), userSaga(), postSaga()])
}

// export default enhancedReducer;
export default rootReducer;