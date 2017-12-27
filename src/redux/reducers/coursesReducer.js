import {combineReducers} from 'redux';
import {GET_COURSE_SUCCESS} from "../actions/coursesActions";


function list(state=[], action){
    switch(action.type){
        case GET_COURSE_SUCCESS:
            return [...state.filter(c=>c.id !== action.course.id), action.course];
        default:
            return state;
    }
}

export const coursesReducer = combineReducers({
    list
});