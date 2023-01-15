import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import coursesReducer from './coursesReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    courses: coursesReducer
});