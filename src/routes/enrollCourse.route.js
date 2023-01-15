const express = require('express');
const router = express.Router();
const enrollStudents = require('../models/EnrolledStudents');
const Courses = require('../models/Courses');
const Students = require('../models/Students');
router.get("/get_Enrolled_Students", (req, res, next) => {
  enrollStudents.find()
      .populate('Courses',['_id', 'course_id', 'course_name', 'teacher_name', 'course_size'])
      .populate('Students',['id', 'name',' surname', 'email', 'phoneNo', 'gender'])
      .exec()
      .then(docs => {
        res.status(200).json({
          enrollStudents: docs.map(doc => {
            return {
                _id: doc._id,
             Courses: doc.Courses,
              Students: doc.Students,
              enrollDate: doc.enrollDate.toDateString(),
              graduationDate: doc.graduationDate.toDateString()
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

  router.post("/enroll_Student", (req, res, next) => {
    Courses.find(req.body)
      .then(Courses => {
        if (!Courses) {
          return res.status(404).json({
            message: "Course Does Not Exist"
          });
        }
        const enrollStudent = new enrollStudents({
          enrollDate: req.body.enrollDate,
          graduationDate: req.body.graduationDate,
          Courses: req.body,
          Students: req.body.id
        });
        return enrollStudent.save();
      })
      .then(result => {
        res.status(201).json({
          message: "Student Enrolled",
          enrolledStudent: {
            Students: result.Students,
            Courses: result.Courses,
            enrollDate: result.enrollDate,
            graduationDate: result.graduationDate
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  

module.exports = router;