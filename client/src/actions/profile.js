// import axios from 'axios';
import api from '../utils/api';
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
    GET_REPOS,
    NO_REPOS
} from './types';
import { setAlert } from './alert';
// import profile from '../reducers/profile';

//GET current user profiles
export const getCurrentProfile = () => async dispatch => {
    try {
        //const res = await axios.get('/api/profile/me');
        const res = await api.get('/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (error) {
       // Clear Profile
        //dispatch({ type: CLEAR_PROFILE });
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
        
    }
}

//GET All user profiles
export const getProfiles = () => async dispatch => {
    //dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await api.get('/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
        
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
        
    }
}

//GET  profile by id
export const getProfileById = userId => async dispatch => {
    try {
        const res = await api.get(`/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
        
    }
}

//GET  Github Repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await api.get(`/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
        
    } catch (error) {
        dispatch({
            type: NO_REPOS,
        })
    }
}

//CREATE OR UPDATE PROFILE
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
            'Content-Type':'application/json'
            }
        }
        const res = await api.post('/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'));
        if (!edit) {
            history.push('./dashboard');
        }
        
    } catch (err) {
        const error = err.response.data.errors.errors;
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
        
    }
}

// Add PROFILE Education
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
            'Content-Type':'application/json'
            }
        }
        const res = await api.put('/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Profile Experience Added','success'));
        history.push('./dashboard');
        
    } catch (err) {
        const error = err.response.data.errors.errors;
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
        
    }
}

// Add PROFILE Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
            'Content-Type':'application/json'
            }
        }
        const res = await api.put('/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Profile Education Added','success'));
        history.push('./dashboard');
        
    } catch (err) {
        console.log(err);
        const error = err.response.data.errors.errors;
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

//DELETE experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Removed', 'success'));
    }
    catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

//DELETE Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Removed', 'success'));
    }
    catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
        
    }
}

//DELETE Account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This  can be undone!')) {
        try {
            await api.delete('/profile');
            dispatch({
                type: DELETE_ACCOUNT
            });
            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch(setAlert('Account has been Removed parmenently deleted'));
        }
        catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            });
            
        }
        
    }
    
}

