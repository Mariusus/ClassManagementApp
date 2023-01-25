import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_COURSES, DELETE_COURSE, 
    DELETE_COURSETYPE, FETCH_COURSETYPE, GET_ENROLLEDSTUDENTS, GET_STUDENT, GET_COURSETYPE} from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (student, history) => dispatch => { 
 console.log(student)

    axios.post('http://localhost:5000/register',  student)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (student) => dispatch => { 

    axios.post('http://localhost:5000/login', student ) 
    .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                alert("Successfully Logged In");
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    //history.push('/login');
}

// Get student User Details
export const getStudentUser = () => dispatch => {
    axios.get('http://localhost:5000/getStudentUser')
        .then(res => {
            dispatch(fetchStudent(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });    
}

export const fetchStudent = payload => {
    return {
      type: GET_STUDENT,
      payload
    }
};

// Insert Courses
export const addCourse = (courses,history) => dispatch => {    
    axios.post('http://localhost:5000/add_Course', courses)
        .then(res => history.push('/'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

// Insert Courses category
export const createCourseType = (coursetypes,history) => dispatch => {
  
axios.post('http://localhost:5000/create_Course_Type', coursetypes)
        .then(res => {
            history.push('/type_manage');
        })
        
        .catch(err => {
            console.log(err)
            dispatch({
               type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

// Fetch Courses Category
export const getCourseType = () => dispatch => {
    axios.get('http://localhost:5000/get_Course_Type')
        .then(res => {
            console.log(res)
            const schemas = [];
            let gettype = res.data;
            for(let i in gettype){
              schemas.push(gettype[i].course_type);
            }
            dispatch(fetchCourseType(schemas));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const fetchCourseType = payload => {
    return {
      type: GET_COURSETYPE,
      payload
    }
  };

//   Fetch Courses
export const getCourses = () => dispatch => {
    console.log('get ccccc')
  
    axios.get('http://localhost:5000/get_Courses')
        .then(res => {
            dispatch(fetchCourses(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });    
}

export const fetchCourses = payload => {
    return {
      type: GET_COURSES,
      payload
    }
  };

export const removeCourse = (_id) => dispatch => {
    axios.delete(`http://localhost:5000/delete_Course/${_id}`) 
        .then(res => {
            dispatch(delete(res.data));

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
}

export const deleteEnrolledCoursePost = _id =>{
    return {
        type: DELETE_COURSE,
        payload: {
            _id
        }
      }
}

export const deleteCourseType = (_id,history) => dispatch => {
    axios.delete(`http://localhost:5000/delete_Course_Type/${_id}`) 
        .then(res => {
            dispatch(deleteEnrolledCoursePost(res.data));
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
}

export const deleteCourseTypePost = _id =>{
    return {
        type: DELETE_COURSETYPE,
        payload: {
            _id
        }
      }
}

export const fetchCourseTypeView = () => dispatch => {
    axios.get('http://localhost:5000/get_Course_Type_View')
        .then(res => {
            dispatch(getCourseTypePosts(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getCourseTypePosts = payload => {
    return {
      type: FETCH_COURSETYPE,
      payload
    }
  };

export const enrollStudent = (courses,history) => dispatch => {    
    axios.post('http://localhost:5000/enroll_Student', courses)
        .then(res => history.push('/student_course_manage'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getEnrolledStudents = () => dispatch => {
    axios.get('http://localhost:5000/get_Enrolled_Students')
  
        .then(res => {
            dispatch(fetchEnrolledStudents(res.data));
            console.log(res.data)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });    
}

export const fetchEnrolledStudents = payload => {
    return {
      type: GET_ENROLLEDSTUDENTS,
      payload
    }
  };


  export default async function activateUser(req, res) {
  const hash = req.query.hash;
  if (!hash) {
    return res.status(401).json({message: 'Cannot Validate an User!'})
  }

  const response = await axios.get(`http://localhost:5000/activate/user/${hash}`);
  if (response.status >= 400) {
    return res.status(401).json({message: 'Cannot Validate an User!'})
  } else {
    res.writeHead(307, { Location: '/users/activated' });
    res.end();
  }
}