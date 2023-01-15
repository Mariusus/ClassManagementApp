const express = require('express');
const router = express.Router();
const Courses = require('../models/Courses');
const validateCoursesInput = require('../validation/courses'); 
const bcrypt = require('bcryptjs'); 

router.post('/add_Course', (req,res,next) => {
    const { errors, isValid } = validateCoursesInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    Courses.findOne({
       
        course_name: req.body.course_name
    }).then(course => {
        if(course) {
            return res.status(400).json({
            
                course_name: 'Course Name already exists'
            });
        } else {
            const addCourse = new Courses({
                course_id: req.body.course_id,
                course_name: req.body.course_name,
                teacher_name: req.body.teacher_name,
                course_type: req.body.course_type,
                course_size: req.body.course_size,
                status: req.body.status
            });
            bcrypt.genSalt(10, (err) => {
                if(err) console.error('There was an error', err);
                    else {
                        addCourse.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.send('Course Created successfully')
                        })  
                    }
                });
            }
        });
})

router.get('/get_Courses',(req,res,next) =>{

    Courses.find(req.params, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});



router.get('/view_Course_Details/:id', (req,res,next) =>{
    Courses.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
})

router.get('/edit_Course/:id',(req,res,next) =>{
    Courses.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.put('/update_Course/:id', (req,res,next) =>{
  
        Courses.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
                console.log(req.body);
                if (err) return next(err);
                res.send('Course was updated.');
            });

})

router.put('/update_Course/:id', (req,res,next) =>{
    Courses.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err,result) {
        if (err) return next(err);
        res.json({
            status: 200,
            result: result
        })
    });
})

router.delete('/delete_Course/:id',(req,res,next) => {
    Courses.findByIdAndDelete({_id:req.params.id}, function (err) {
        if (err) return next(err);
        res.send("The Course Was Deleted");
    })
})  

router.put('/active_Course/:id', (req,res,next) =>{
    Courses.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err,result) {
        if (err) return next(err);
        res.json({
            status: 200,
            result: result
        })
    });
})

module.exports = router;