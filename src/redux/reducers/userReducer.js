import {combineReducers} from 'redux';
import {
    USER_LOGIN_SUCCESS,
    LOGOUT_SUCCESS
        } from "../actions/userActions";

function profile(state={}, action){
    switch(action.type){
        case USER_LOGIN_SUCCESS:
            return action.profile;
        case LOGOUT_SUCCESS:
            return {};
        default:
            return state;
    }
}

export const userReducer = combineReducers({
    profile
});