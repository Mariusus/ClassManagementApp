const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCoursesInput(data) {
    let errors = {};
    console.log(data)
    data.course_id = !isEmpty(data.course_id) ? data.course_id : '';
    data.course_name = !isEmpty(data.course_name) ? data.course_name : '';
    data.teacher_name = !isEmpty(data.teacher_name) ? data.teacher_name : '';
    data.course_type = !isEmpty(data.course_type) ? data.course_type : '';
    data.course_size = !isEmpty(data.course_size) ? data.course_size : '';


  
    if(!Validator.isLength(data.course_name, { min: 2, max: 30 })) {
        errors.course_name = 'Course Name Needs To Be Between 2 and 30 Characters';
    }
    
    if(Validator.isEmpty(data.course_name)) {
        errors.course_name = 'Course Name Is Required';
    }

    if(!Validator.isLength(data.teacher_name, { min: 2, max: 30 })) {
        errors.teacher_name = 'Teachers Name Needs To Be Between 2 and 30 Characters';
    }
    
    if(Validator.isEmpty(data.teacher_name)) {
        errors.teacher_name = 'Teachers Name Is Required';
    }

    if(!Validator.isLength(data.course_type, { min: 2, max: 30 })) {
        errors.course_type = 'Course Type Needs To Be Between 2 and 30 Characters';
    }
    
    if(Validator.isEmpty(data.course_type)) {
        errors.course_type = 'Course Type Field Required';
    }

    if(!Validator.isNumeric(data.course_size, { min: 1, max: 1000 })) {
        errors.course_size = 'Course Size Needs To Be Between 1 and 1000 Number';
    }
    
    if(Validator.isEmpty(data.course_size)) {
        errors.course_size = 'Course Size Field Is Required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}