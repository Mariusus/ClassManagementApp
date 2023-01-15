const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const StudentsSchema = require('../models/Students');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
 //const validateProfile = require('../validation/profile');


//API Call for Register form
router.post('/register', function (req, res) {
  
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    StudentsSchema.findOne({
        email: req.body.email
    }).then(student => {
        if(student) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const register = new StudentsSchema({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                gender: req.body.gender,
                phoneNo: req.body.phoneNo,
                role: req.body.role
            });
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(register.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            register.password = hash;
                            register
                                .save()
                                .then(student => {
                                    res.json(student)
                                }); 
                        }
                    });
                }
            });
        }
    })
});


//API Call for Login Form
router.post('/login', function (req, res) {
   console.log(req.body)
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    StudentsSchema.findOne({email})
        .then(student => {
            if(!student) {
                errors.email = 'student not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, student.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: student.id,
                            name: student.name,
                            surname: student.surname,
                            email: student.email,
                            gender: student.gender,
                            phoneNo: student.phoneNo,
                            role: student.role
                        }
                        
                        jwt.sign(payload, 'secret', {expiresIn: 3600}, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        }); 
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    return res.json({
        id: req.student.id,
        name: req.student.name,
        surname: req.student.surname,
        email: req.student.email,
        gender:req.student.gender,
        phoneNo:req.student.phoneNo,
        role:req.student.role

    });
});

// API to get all the student information
router.get('/get_Student',(req,res,next) =>{

    StudentsSchema.find(req.params, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});


// API to get all the Student information
router.get('/get_All_Students',(req,res,next) =>{
    var query = { role: "Student" };
    StudentsSchema.find(query, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});


// API to edit the user details
router.get('/edit_Student/:id', (req, res, next) =>{
    StudentsSchema.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
})


// API to update the profile of particular user
router.put('/update_Profile/:id', (req,res,next) =>{
    // const { errors, isValid } = validateProfile(req.body);

    // if(!isValid) {
    //     return res.status(400).json(errors);
    // }
    StudentsSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err,result) {
        if (err) return next(err);
        res.send('user details are updated');
    });
})
router.put('/active_Student/:id', (req,res,next) =>{
    StudentsSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err,result) {
        if (err) return next(err);
        res.json({
            status: 200,
            result: result
        })
    });
})

module.exports = router;    