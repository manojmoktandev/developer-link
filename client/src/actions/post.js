// import axios from 'axios';
import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKE,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    ADD_COMMENT_REPLY,
    DELETE_COMMENT
} from './types';
import setAuthToken from '../utils/setAuthToken';
//GET all posts
export const getPosts = () => async dispatch => {
    try {
        //const res = await axios.get('/api/post');
        const res = await api.get('/post');
        dispatch
        ({
            type: GET_POSTS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//GET  post
export const getPost = id => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await api.get(`/post/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
        
    } catch (err) {
        console.log(err);
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Add Like of post
export const addLike = id => async dispatch => {
    try {
        const res = await api.put(`/post/like/${id}`);
        dispatch({
            type: UPDATE_LIKE,
            payload: {id,likes:res.data}
        });
        
    } catch (err) {
        if (err.response) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}
//Remove  post
export const removePost = id => async dispatch => {
    try {
        await api.delete(`/post/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        });
        dispatch(setAlert('Post Removed successfully', 'success'));
        
    } catch (err) {
        if (err.response) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }
}

//Remove Like of post
export const removeLike = id => async dispatch => {
    try {
        const res = await api.put(`/post/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKE,
            payload: {id,likes:res.data}
        });
        
    } catch (err) {
        if (err.response) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }
}

//ADD Post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-type':'application/json'
        }
    }
    try {
        const res = await api.post('/post',formData,config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Post Saved Successfully ', 'success'));
        
    } catch (err) {
        if (err.response) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }
}

//ADD Comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-type':'application/json'
        }
    }
    try {
        const res = await api.post(`/post/comment/${postId}`,formData,config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment Saved Successfully ', 'success'));
        
    } catch (err) {
        if (err.response) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }
}

//REPLY Comment
export const replyComment = ( formData) => async dispatch => {
    const config = {
        headers: {
            'Content-type':'application/json'
        }
    }
    const postId = formData.postId;
    try {
        const res = await api.post(`/post/${postId}/comment/reply/`,formData,config);
        dispatch({
            type: ADD_COMMENT_REPLY,
            payload: res.data
        });
        dispatch(setAlert('Comment Reply Successfully ', 'success'));
        
    } catch (err) {
        if (err.response) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }
}

//REMOVE Comment
export const deleteComment = (postId,commentId) => async dispatch => {
    try {
        await api.delete(`/post/comment/${postId}/${commentId}`);
        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        if (err.response) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }
}