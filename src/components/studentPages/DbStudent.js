import React, {Component} from 'react';
import {getEnrolledStudents} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DbStudent extends Component{

    componentDidMount(){
        this.props.getEnrolledStudents();
    }

    render(){
        this.courses = this.props['courses']['enrolledStudents'] ['enrollStudents'] 
        console.log('test',  this.props)

        if( this.props['courses'] && this.props['courses']['enrolledStudents'] && this.props['courses']['enrolledStudents']['enrollStudents'] ){
            var enrolledStudent = [];
            this.courses.forEach(obj1 => {
                this.obj = obj1;
                console.log('asdasx', this.obj)
                if(this.obj.Students._id === this.props.auth.student.id ){
                    enrolledStudent.push(this.obj)
                    console.log('enroll stu', enrolledStudent)
                }
            });
            
       
        }
        
        return(
            
            <div className="dashboard">
                <div className="row">
                <table className="table table-hover table-bordered view-course">
                        <thead>
                            <tr>
                                <th>Course Id</th>
                                <th>Course Name</th>
                                <th>Teacher Name</th>
                                <th>Course Size</th>
                            </tr> 
                        </thead>
                        <tbody>
                        
                            {enrolledStudent && enrolledStudent.map((el) => {
                                console.log('el', el)
                            return  <tr className="firstrow" key={el._id}>
                                        <td className="sno"></td>
                                        <td>{el.Courses.course_name.charAt(0).toUpperCase() + el.Courses.course_name.substring(1)}</td>
                                        <td>{el.Courses.teacher_name.charAt(0).toUpperCase() + el.Courses.teacher_name.substring(1)}</td>
                                        <td>{el.Courses.course_size}</td>
                                    </tr>
                            })}
                                        
                        </tbody>
                    </table>
                </div>
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
  )(withRouter(DbStudent));