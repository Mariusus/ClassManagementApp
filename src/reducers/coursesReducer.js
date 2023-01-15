import { GET_COURSETYPE, GET_COURSES, DELETE_COURSE, FETCH_COURSETYPE, GET_ENROLLEDSTUDENTS, DELETE_COURSETYPE } from '../actions/types';


const initialState = {
    schema: [],
    viewCourse: [],
    courseType: [],
    enrolledStudents: []
}

export default function(state = (initialState), action ) {
    switch(action.type) {  
        case GET_COURSETYPE:
            return {
                ...state, 
                schema: action.payload
            };
        case FETCH_COURSETYPE:
                return {
                    ...state, 
                    courseType: action.payload
                };
        case GET_COURSES:
            return{
                ...state,
                viewCourse: action.payload
            };
        case DELETE_COURSE:
            return { 
                viewCourse: state.viewCourse.filter(viewCourse =>
                    viewCourse._id !== action.payload._id )
            };
        case DELETE_COURSETYPE:
            return {
                ...state,
                schema: state.schema.filter(schema =>
                    schema._id !== action.payload._id )
            };
        case GET_ENROLLEDSTUDENTS:
            return{
                ...state,
                enrolledStudents: action.payload
            };
        default: 
            return state;
    }
}