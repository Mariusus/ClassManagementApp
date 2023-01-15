
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EnrolledStudentsSchema = new Schema({
    Students:{
        type: Schema.Types.ObjectId,
        ref: 'Students'
    },
    Courses:{
        type: Schema.Types.ObjectId,
        ref: 'Courses'
    },
    enrollDate:{
        type: Date,
     //   default: Date.now
    },
    graduationDate:{
        type: Date
    }
});


// Export the model
module.exports = mongoose.model('EnrolledStudents', EnrolledStudentsSchema);