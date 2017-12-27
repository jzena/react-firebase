import {combineReducers} from 'redux';
import {GET_AUTHOR_SUCCESS} from "../actions/authorsActions";

function list(state=[], action){
    switch(action.type){
        case GET_AUTHOR_SUCCESS:
            return [...state, action.author];
        default:
            return state;
    }
}

function object(state={}, action){
    switch(action.type){
        case GET_AUTHOR_SUCCESS:
            return {...state, [action.author.uid]:action.author};
        default:
            return state;
    }
}

export const authorsReducer = combineReducers({
    list,
    object
});