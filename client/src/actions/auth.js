//import axios from 'axios';
import api from '../utils/api';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_PROFILE,
    LOGOUT,
    GET_DASHBOARD_COUNT
} from './types';

import setAuthToken from '../utils/setAuthToken';

//LOAD USER
export const loadDashboard = () => async dispatch => {
    try {
        const res = await api.get('/auth/dashboardCount');
        dispatch({
            type: GET_DASHBOARD_COUNT,
            payload:res.data
        })
        
    } catch (err) {
        if (err.msg) {
            console.log(err.msg);
            //dispatch(setAlert(err.msg, 'danger'));    
        }
    }
}

//LOAD USER
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        //const res = await axios.get('/api/auth');
        const res = await api.get('/auth');
        dispatch({
            type: USER_LOADED,
            payload:res.data
        })
        
    } catch (err) {
        if (err.msg) {
            dispatch(setAlert(err.msg, 'danger'));    
        }
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// REGISTER User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await api.post('/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        const error = err.response.data.errors.errors;
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
        
    }
};

// Login User
export const login = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
  
    try {
        const res = await api.post('/auth', body, config);
        
        if (res.data.token === null) {
            dispatch(setAlert(res.data.msg,'danger'))
        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload:res.data
            });
            dispatch(loadUser());
        }
       

    } catch (err) {
        const error = err.response.data.errors.errors;
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg,'danger')));
        }
        dispatch({
            type: LOGIN_FAIL,
        }); 
    }
}

// Logout 
export const logout = () => dispatch=> {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: LOGOUT
    });
   
}