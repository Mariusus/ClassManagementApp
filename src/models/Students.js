//models >> Students.js

const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let StudentsSchema = new Schema({
    name: {
        type: String,
        required: true, 
        max: 20
    },
    surname: {
        type: String,
        required: true, 
        max: 20
    },
    email:{
        type: String, 
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    confirmPassword:{
        type: String, 
        required: true
    },
    phoneNo:{
        type:Number,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    role: {
        type: String, 
        required: true
    },
  //  inCourse: {
  //      type: ObjectId, 
    //    required: false
  //  },
  //  status: {
   //     type: String, 
   //     required: false
  //  },
    
   
});


// Export the model
module.exports = mongoose.model('Students', StudentsSchema);