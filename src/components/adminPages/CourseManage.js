import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ViewCourses from './ViewCourses';

class CourseManage extends Component {

    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12 courseadd">
                        <Link to='/add_Course' 
                            className="fas fa-plus btn btn-primary float-right">
                                ADD COURSE
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ViewCourses />
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseManage;