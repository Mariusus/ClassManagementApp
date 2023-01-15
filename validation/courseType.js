const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCourseTypeInput(data) {
    let errors = {};
    
    data.course_type = !isEmpty(data.course_type) ? data.course_type : '';

    if(!Validator.isLength(data.course_type, { min: 2, max: 30 })) {
        errors.course_type = 'Course Type Needs To Be Between 2 and 30 Characters';
    }
    
    if(Validator.isEmpty(data.course_type)) {
        errors.course_type = 'Course Type Field Required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}