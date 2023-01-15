

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CoursesSchema = new Schema({
    course_id:{
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true, 
        max: 20
    },
    teacher_name:{
        type: String, 
        required: true
    },
    course_type:{
        type: String, 
        required: true
    },
    course_size:{
        type: String, 
        required: true
    },
    status:{
        type: String, 
        required: true
    },
  //  editedBy:{
   //     type:Object,
   //     default: {
   //         "name":"Admin"
 //       }
  //  }
});


// // Export the model
//exports.require = mongoose.model('Courses', CoursesSchema);

module.exports = mongoose.model('Courses', CoursesSchema);