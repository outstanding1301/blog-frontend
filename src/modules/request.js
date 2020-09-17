import { createAction, handleActions } from 'redux-actions';

const START_REQUEST = 'loading/START_REQUEST';
const FINISH_REQUEST = 'loading/FINISH_REQUEST';

// 액션
export const startRequest = createAction(START_REQUEST, requestType => requestType);
export const finishRequest = createAction(FINISH_REQUEST, requestType => requestType);

const initialState = {};

// 리듀서
const request = handleActions(
    {
        [START_REQUEST]: (state, action) => ({
            ...state,
            [action.payload]: true, // requestType: true
        }),
        [FINISH_REQUEST]: (state, action) => ({
            ...state,
            [action.payload]: false,
        })
    },
    initialState
);

export default request;