import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {coursesReducer} from "./coursesReducer";
import {authorsReducer} from "./authorsReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    courses: coursesReducer,
    authors: authorsReducer
});