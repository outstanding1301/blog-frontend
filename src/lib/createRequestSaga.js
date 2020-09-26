import { call, put } from 'redux-saga/effects';
import { startRequest, finishRequest } from '@modules/request';

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
}

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) { // saga 호출시
        yield put(startRequest(type)); // 요청 시작
        try {
            const response = yield call(request, action.payload); // request 액션 실행 (with payload)
            yield put({ // 요청 성공시 리듀서 호출
                type: SUCCESS,
                payload: response.data,
                meta: response,
            });
        }
        catch (e) {
            yield put({ // 요청 실패시 리듀서 호출
                type: FAILURE,
                payload: e,
                error: true
            });
        }
        yield put(finishRequest(type)); // 요청 완료
    }
}