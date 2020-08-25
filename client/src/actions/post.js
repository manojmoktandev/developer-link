import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKE,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    DELETE_COMMENT
} from './types';

//GET all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');
        dispatch({
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
    try {
        const res = await axios.get(`/api/post/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Add Like of post
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/like/${id}`);
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
        await axios.delete(`/api/post/${id}`);
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
        const res = await axios.put(`/api/post/unlike/${id}`);
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
        const res = await axios.post('/api/post',formData,config);
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
        const res = await axios.post(`/api/post/comment/${postId}`,formData,config);
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

//REMOVE Comment
export const deleteComment = (postId,commentId) => async dispatch => {
    try {
        await axios.delete(`/api/post/comment/${postId}/${commentId}`);
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