import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {enrollStudent,logoutUser,getCourseType} from '../../actions/authentication';


class StudentEnrollCourse extends Component {

    constructor(props){
        super(props);
        this.state={
            _id:"",
            course_id: "",
            course_name: "",
            teacher_name: "",
            course_size: "1",
            course_type: "",
            enrollDate:"",
            graduationDate:""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value 
        });
    };
    
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        this.props.getCourseType();

        axios.get('http://localhost:5000/edit_Course/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    _id: res.data._id,
                  course_id: res.data.course_id, 
                  course_name: res.data.course_name,
                  teacher_name: res.data.teacher_name,
                  course_type: res.data.course_type
                });
            })
            .catch((err) =>{
                console.log(err);
            })

            const today = new Date();
            const month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1)
            const day = ((today.getDate() ) < 10 ? '0' : '') + (today.getDate())
            const date = today.getFullYear()+'-'+ month +'-'+ day;

            const currDate = new Date();
            currDate.setDate(currDate.getDate());
           // console.log(today)
            const enrollDate = ((currDate.getDate() ) < 10 ? '0' : '') + (currDate.getDate());
            const graduationDate = today.getFullYear()+'-'+ month +'-'+(enrollDate);
            
            this.setState({
                enrollDate: date,
                graduationDate: graduationDate
            })
      }

      onSubmit(e) {
        e.preventDefault();
        const enrollStudent = {
            _id: this.state._id,
            course_id: this.state.course_id,
            course_name: this.state.course_name,
            teacher_name: this.state.teacher_name,
            course_type: this.state.course_type,
            course_size: this.state.course_size,
            enrollDate: this.state.enrollDate,
            graduationDate: this.state.graduationDate,
            id: this.props.auth.student.id,
            name: this.props.auth.student.name,
            surname: this.props.auth.student.surname,
       
        };
        this.props.enrollStudent(enrollStudent, this.props.history);
      }

    render(){
        
        return(
           
            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <strong>Enroll In A Course</strong>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                        {/* <tr>
                                                <td> ID</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="_id" 
                                                        placeholder=" Id" 
                                                        name="_id"
                                                        readOnly
                                                        value={this.state._id}
                                                    />
                                                 </td>
                                            </tr> */}
                                            <tr>
                                                <td>Course Id</td>
                                                <td>
                                                    <input type="number"
                                                        min="1" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="course_id" 
                                                        placeholder="course Id" 
                                                        name="course_id"
                                                        readOnly
                                                        value={this.state.course_id}
                                                    />
                                                 </td>
                                            </tr>
                                            <tr>
                                                <td>Course Name</td>
                                                <td>
                                                    <input type="text" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="course_name" 
                                                        placeholder="Course Name" 
                                                        name="course_name"
                                                        readOnly
                                                        value={this.state.course_name}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Teacher Name</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange} 
                                                        className="form-control" 
                                                        id="teacher_name" 
                                                        placeholder="teacher Name" 
                                                        name="teacher_name"
                                                        readOnly
                                                        value={this.state.teacher_name}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Course Type</td>
                                                <td>
                                                    <input type="text" 
                                       onChange={this.onChange}
                                       className="form-control" 
                                       id="course_type" 
                                       placeholder="Course Type" 
                                       name="course_type"
                                       readOnly
                                       value={this.state.course_type}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Course Size</td>
                                                <td>
                                                    <input type="number" 
                                                        onChange={this.onChange} 
                                                        min="1" 
                                                        className="form-control" 
                                                        id="course_size" 
                                                        placeholder="course_size" 
                                                        name="course_size"
                                                        readOnly
                                                        value={this.state.course_size}
                                                    />
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <td>Enrollment Date</td>
                                                <td>
                                                    <input type="date" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="enrollDate" 
                                                        placeholder="Enrollment Date" 
                                                        name="enrollDate"
                                                        readOnly
                                                        value={this.state.enrollDate}
                                                    />  
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Graduation Date</td>
                                                <td>
                                                    <input type="date" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="graduationDate" 
                                                        placeholder="Graduation Date" 
                                                        name="graduationDate"
                                                        readOnly
                                                        value={this.state.graduationDate}
                                                    />  
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="admin-updateBtn">
                                <button type="submit" className="btn btn-success">Enroll In A Course</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        )
    }
}

StudentEnrollCourse.propTypes = {
    enrollStudent: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    getCourseType: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    courses: state.courses
});


export default connect(
    mapStateToProps,
    {enrollStudent,logoutUser,getCourseType}
  )(withRouter(StudentEnrollCourse));
