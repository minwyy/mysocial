import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        idToken: authData.data.idToken,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {dispatch(logout())}, expireTime * 1000)
    }
}


export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCm5s6peMxSu2AtZnA0QTABrnFGVN1yIEE'
        // console.log(authData);
        axios.post(url, authData)
        .then(response => {
            // console.log(response.data);
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authTimeout(response.data.expiresIn));
            dispatch(authSuccess(response));
        })
        .catch(err => {
            // console.log(err);
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const authCheckLocal = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationTime = new Date (localStorage.getItem('expirationTime'));
            if (expirationTime < new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                const retrivedData = {
                    data: {
                    idToken: token,
                    localId: userId
                }
                }
                dispatch(authSuccess(retrivedData));
                // console.log(expirationTime.getTime() - new Date().getTime());
                dispatch(authTimeout(((expirationTime.getTime() - new Date().getTime()) / 1000)));
            }
        }
    }
}