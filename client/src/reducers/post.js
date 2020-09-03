import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKE,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_COMMENT_REPLY
} from '../actions/types';
const initialState = {
    posts: [],
    post: null,
    loading: true,
    error:{}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_POST:
            return {
                ...state,
                posts:[payload,...state.posts] ,
                loading:false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comment: payload },
                loading:false
            }
        case ADD_COMMENT_REPLY:
            return {
                ...state,
                post: { ...state.post, comment: payload },
                loading:false
            }
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading:false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading:false
            }
        case UPDATE_LIKE:
            return {
                ...state,
                posts: state.posts.map(post =>
                  post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
                loading: false
              };
        
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post =>
                  post._id !== payload
                ),
                loading: false
            };
        case DELETE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comment: state.post.comment.filter(comment => comment._id !== payload),
                },
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state;
    }
    
}