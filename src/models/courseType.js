const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CoursesTypeSchema = new Schema({
    course_type:{
        type: String, 
        required: true
    }
});


module.exports = mongoose.model('CourseType', CoursesTypeSchema);