import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TeacherViewCourse from '../TeacherPages/TeacherViewCourse';

class TeacherCourseManage extends Component {

    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12 courseadd">
                        <Link to='/teacher_add_course' 
                            className="fas fa-plus btn btn-primary float-right">
                                Add A New Course
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <TeacherViewCourse />
                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherCourseManage;