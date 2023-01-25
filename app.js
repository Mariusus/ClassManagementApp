const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
//Routing


const register = require('./src/routes/user.route');
const login = require('./src/routes/user.route');
const add_Course = require('./src/routes/course.route');
const enrollStudent = require('./src/routes/enrollCourse.route');
const getEnrolledStudents = require('./src/routes/enrollCourse.route');
const getCourse = require('./src/routes/course.route');
const editCourse = require('./src/routes/course.route');
const getCourseType = require('./src/routes/coursetype.route');
const getCourseTypeView = require('./src/routes/coursetype.route');
const createCourseType = require('./src/routes/coursetype.route');
const viewCourseDetails = require('./src/routes/course.route');
const updateCourse = require('./src/routes/course.route');
const getMe = require('./src/routes/user.route');


//const getEnrolledCourses = require('./src/routes/course.route');
//import register from './src/routes/user.route.js';
//import login from'./src/routes/user.route.js';
//import addcourses from'./src/routes/course.route.js';
//import enrollCourse  from'./src/routes/enrollCourse.route';
//import Register from './src/components/Register';
// import { default: Register }  from './src/components/Register';

//Express
const app = express();
const cors = require('cors');

//const { coursetype, /* getCourseType */} = require('./src/actions/authentication');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// Database connection
const config = require("./db").mongoURI;

mongoose
    .connect(config,
            { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
    
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Body Parser-Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Passport Initialization
app.use(passport.initialize());
require('./passport')(passport);


app.post('/login',login);
app.post('/register',register);
app.post('/add_Course',add_Course);
app.get('/get_Courses', getCourse);
app.post('/create_Course_Type', createCourseType);
app.get('/get_Course_Type', getCourseType);
app.get('/get_Course_Type_View', getCourseTypeView);
app.get('/edit_Course/:id', editCourse);
app.get('/get_Enrolled_Students', getEnrolledStudents);
app.post('/enroll_Student', enrollStudent);
app.get('/view_Course_Details/:id', viewCourseDetails);
app.put('/update_Course/:id', updateCourse);
app.get('/me',getMe);



//PORT
let port = 5000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

