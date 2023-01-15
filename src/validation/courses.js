
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


    // Server-side validation for courses
    if(!Validator.isNumeric(data.course_id, { min: 1, max: 30 })) {
        errors.course_id = 'Course Id Must Be Between 1 and 30';
    }
    
    if(Validator.isEmpty(data.course_id)) {
        errors.course_id = 'Course Id Is Required';
    }

    if(!Validator.isLength(data.course_name, { min: 2, max: 30 })) {
        errors.course_name = 'Course Name Must Be Between 2 and 30 Characters';
    }
    
    if(Validator.isEmpty(data.course_name)) {
        errors.course_name = 'Course Name Is Required';
    }

    if(!Validator.isLength(data.teacher_name, { min: 2, max: 30 })) {
        errors.teacher_name = 'Teachers Name Must Be Between 2 and 30 Characters';
    }
    
    if(Validator.isEmpty(data.teacher_name)) {
        errors.teacher_name = 'Teachers Name Is Required';
    }

    if(!Validator.isLength(data.course_type, { min: 2, max: 30 })) {
        errors.course_type = 'Course Type Must Be Between 2 and 30 Characters';
    }
    
    if(Validator.isEmpty(data.course_type)) {
       errors.course_type = 'Course Type Is Required';
    }

    if(!Validator.isNumeric(data.course_size, { min: 1, max: 60 })) {
        errors.course_size = 'Course Size Must Be Between 1 and 60';
    }
    
    if(Validator.isEmpty(data.course_size)) {
        errors.course_size = 'Course Size Is Required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}