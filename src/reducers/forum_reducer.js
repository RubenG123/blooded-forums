import {
    GET_FORUM_SECTIONS,
    GET_SUBCATEGORY_DATA,
    GET_THREADS,
    GET_THREAD_DATA,
    GET_POSTS
} from '../actions/types';
import { INITIAL_STATE } from './initial_state';

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_FORUM_SECTIONS:
            return {...state, categories: action.payload};

        case GET_SUBCATEGORY_DATA:
            return {...state, subcategory: action.payload};

        case GET_THREADS:
            var threadKey = `p_${action.payload.subcategoryId}_${action.payload.page}`;
            var newThreadState = {...state};

            newThreadState.threads = {
                ...state.threads,
                [threadKey]: action.payload.data
            };

            return newThreadState;

        case GET_THREAD_DATA:
            var threadDataKey = `t_${action.payload.threadId}`;
            var newThreadDataState = {...state};

            newThreadDataState.topics = {
                ...state.topics,
                [threadDataKey]: action.payload.data
            };

            return newThreadDataState;

        case GET_POSTS:
            var postKey = `p_${action.payload.threadId}_${action.payload.page}`;
            var newPostState = {...state};

            newPostState.posts = {
                ...state.posts,
                [postKey]: action.payload.data
            };

            return newPostState;

        default:
            return state;
    }
}