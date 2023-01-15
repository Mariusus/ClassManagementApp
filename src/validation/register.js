const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    console.log(data)
    data.name = !isEmpty(data.name) ? data.name : '';
    data.surname = !isEmpty(data.surname) ? data.surname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNo : '';
    data.role = !isEmpty(data.role) ? data.role : '';


    // Server-side validation for registering new user

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'User Name Must Be Between 1 and 30 Characters';
    }
    
    if(Validator.isEmpty(data.name)) {
        errors.name = 'User Name Is Required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Wrong Email Format';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email Is Required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password Must Be Between 6 and 30 Characters';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password Is Required';
    }

    if(!Validator.isLength(data.confirmPassword, {min: 6, max: 30})) {
        errors.confirmPassword = 'Password Must Be Between 6 and 30 Characters';
    }

    if(!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Password And Confirm Password Must Match';
    }

    if(Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Password Is Required';
    }
    if(Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender Is Required';
    }
    if(!Validator.isLength(data.phoneNo, { min: 5, max: 10 })) {
        errors.phoneNo = 'Phone Number Must Be Between 5 and 10 Digits';
    }
    if(Validator.isEmpty(data.phoneNo)) {
        errors.phoneNo = 'Phone Number Is Required';
    }
    if(Validator.isEmpty(data.role)) {
        errors.role = 'Role Is Required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}