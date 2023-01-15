import React, { Component } from 'react';
import {getEnrolledStudents} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ViewStudentEnrolls extends Component {

    componentDidMount(){
        this.props.getEnrolledStudents();
        console.log(this.props)
    }

    render(){
     
        this.courses = this.props['courses']['enrolledStudents'] ['enrollStudents'] 
        console.log('test',  this.props)

        if( this.props['courses'] && this.props['courses']['enrolledStudents'] && this.props['courses']['enrolledStudents']['enrollStudents'] ){
          
            var EnrollCourseStudent = [];
            this.courses.forEach(obj1 => {
               
                this.obj = obj1;
        
                if(this.props.match.params.id === this.obj.student._id ){
                    EnrollCourseStudent.push( this.obj);
                }
            });
        }
        
        return(

            <div>
                
                <table className="table table-hover table-bordered view-course">
                        <thead>
                            <tr>
                                <th>Course Id</th>
                                <th>Course Name</th>
                                <th>Teacher Name</th>
                                <th>Enrollment Date</th>
                                <th>Graduation Date</th>
                            </tr> 
                        </thead>
                        <tbody>
                            
                            {EnrollCourseStudent && EnrollCourseStudent.map((el) => { 
                            
                            return  <tr className="firstrow" key={el.Courses._id}>
                                
                                        <td className="sno"></td>
                                        <td>{el.Courses.course_name.charAt(0).toUpperCase() + el.Courses.course_name.substring(1)}</td>
                                        <td>{el.Courses.teacher_name.charAt(0).toUpperCase() + el.Courses.teacher_name.substring(1)}</td>
                                        <td>{el.enrollDate}</td>
                                        <td>{el.graduationDate}</td>
                                    </tr>
                            })}
                                        
                        </tbody>
                    </table>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    courses: state.courses
});

export default connect(
    mapStateToProps,
    {getEnrolledStudents}
  )(withRouter(ViewStudentEnrolls));