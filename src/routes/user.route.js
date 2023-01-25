const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const StudentsSchema = require('../models/Students');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
 //const validateProfile = require('../validation/profile');

 const mailer = require('../mailer')

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
                          //  const secretToken = randomString.generate()
                           const html = 'Hello there, <br/> Your registration is almost complete<br/> <br/>Verify your email below by inserting the provided token:<br/> Token: <b></b><br/>On the following page: <a href="http://localhost:5000/verify"> http://localhost:5000/verify</a><br/><br/>'
                        
                                mailer.sendMail('ClassManagement@app.com', req.body.email, 'Class Management Verify', html)
                                console.log('success', 'Please check your email')
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
        id: req.user.id,
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email,
        gender:req.user.gender,
        phoneNo:req.user.phoneNo,
        role:req.user.role

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


router.post('/reset_Password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await StudentsSchema.findOne({email});
      if (!user) { return res.status(422).send("User doesn't exists!"); }
  
      const hasHash = await AccessHash.findOne({userId: StudentsSchema._id});
      if (hasHash) { return res.status(422).send("Email to reset password was already sent!"); }
  
      const hash = new AccessHash({userId: StudentsSchema._id});
      await hash.save();
      await sendResetPasswordEmail({toUser: StudentsSchema, hash: hash._id});
      return res.json({message: 'Please check your email to reset the password!'})
    } catch {
      return res.status(422).send('Ooops, something went wrong!');
    }
  })
  
  router.post('/reset_Password/confirm', async (req, res) => {
    const { password, hash } = req.body;
  
    try {
      const aHash = await AccessHash.findOne({_id: hash});
      if (!aHash || !aHash.userId) {
        return res.status(422).send('Cannot reset a password!');
      }
  
      const user = await StudentsSchema.findOne({_id: aHash.userId});
      if (!user) {
        return res.status(422).send('Cannot reset a password!');
      }
  
      await user.remove();
      await aHash.remove();
      const newUser = new StudentsSchema({...user, password});
      await newUser.hashPassword();
      await newUser.save();
      return res.json({message: 'Password has been reseted!'});
    } catch {
      return res.status(422).send('Ooops, something went wrong!');
    }
  })
  
  router.get('/activate/user/:hash', async (req, res) => {
    const { hash } = req.params;
    try {
      const user = await StudentsSchema.findOne({_id: hash});
      const newUser = new StudentsSchema({...user});
      await newUser.save();
      await user.remove();
      res.json({message: `User ${hash} has been activated`})
    } catch {
      res.status(422).send('User cannot be activated!');
    }
  })

module.exports = router;    