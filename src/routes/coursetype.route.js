const express = require('express');
const router = express.Router();
const CoursesTypeSchema = require('../models/courseType');
const validateCourseTypeInput = require('../validation/coursetype'); 
const bcrypt = require('bcryptjs'); 

router.post('/create_Course_Type', (req,res,next) => {
    const { errors, isValid } = validateCourseTypeInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    CoursesTypeSchema.findOne({
        course_type: req.body.course_type
    }).then(course_type => {
        if(course_type) {
            return res.status(400).json({
                course_type: 'Course Type Already Exists'
            });
        }else {
            const course_type = new CoursesTypeSchema({
                course_type: req.body.course_type
            });
            bcrypt.genSalt(10, (err) => {
                if(err) console.error('There was an error', err);
                    else {
                        course_type.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.send('Course Type Added')
                        })
                    }
            });
        }
    })
})

router.get('/get_Course_Type_View',(req,res) =>{

    CoursesTypeSchema.find(req.params, function (err, result) {
        console.log(req)
        if (err) return next(err);
        res.send(result);
    })
});
router.get('/get_Course_Type',(req,res) =>{

    CoursesTypeSchema.find(req.params, function (err, result) {
        console.log(req)
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/edit_Course_Type/:id',(req,res,next) =>{
    CoursesTypeSchema.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.put('/update_Course_Type/:id', (req,res,next) =>{
    CoursesTypeSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        console.log(req.body);
        if (err) return next(err);
        res.send('Course Type Has Been Updated.');
    });
})


router.delete('/delete_Course_Type/:id',(req,res,next) => {
    CoursesTypeSchema.findByIdAndDelete({_id:req.params.id}, function (err) {
        if (err) return next(err);
        res.send("Course Type Has Been Deleted");
    })
})  

module.exports = router;