import React, {Component} from 'react';
import StudentViewCourse from '../studentPages/StudentViewCourse';


class StudentCourseManage extends Component{

    render(){
        return(
            <div className="container">
                {}
                <div className="row">
                    <div className="col-md-12">
                        <StudentViewCourse />
                    </div>
                </div>
            </div>

        )
    }
}

export default StudentCourseManage;