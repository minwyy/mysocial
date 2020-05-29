import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initState = {
    token: null,
    // userId: null,
    error: null,
    // loading: false,
    // authRedirectPath: '/'
}

const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.idToken,
                error: null,
            })
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
            })
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
            })
        default:
            return state;
    }
}


export default reducer;