
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCourseTypeInput(data) {
    let errors = {};
    console.log(data)
    data.course_type = !isEmpty(data.course_type) ? data.course_type : '';

    if(!Validator.isLength(data.course_type, { min: 2, max: 30 })) {
        errors.course_type = 'Course Type must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.course_type)) {
        errors.course_type = 'Course Type Field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}