import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getCourseType} from '../../actions/authentication';

class TeacherEditCourse extends Component{

    constructor(props){
        super(props);
        this.state={
            course_id: "",
            course_name: "",
            teacher_name: "",
            course_type: "",
            course_size: "",
            status:""
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
                  course_id: res.data.course_id, 
                  course_name: res.data.course_name,
                  teacher_name: res.data.teacher_name,
                  course_type: res.data.course_type,
                  course_size: res.data.course_size,
                  status: res.data.status
                });
            })
            .catch((err) =>{
                console.log(err);
            })
      }

    onSubmit(e) {
        e.preventDefault();
        const viewCourse = {
            course_size: this.state.course_size,
            editedBy: this.props.auth.student
        };
        
        axios.put('http://localhost:5000/edit_Course/'+this.props.match.params.id, viewCourse)
            .then(res => console.log(res.data));
        
        this.props.history.push('/teacher_course_manage');
      }
     

    render(){
        

        return(
            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <strong>Edit A Course</strong>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td>Course id</td>
                                                <td>{this.state.course_id}</td>
                                            </tr>
                                            <tr>
                                                <td>Course Name</td>
                                                <td>{this.state.course_name}</td>
                                            </tr>
                        
                                            <tr>
                                                <td>Course Type</td>
                                                <td>{this.state.course_type}</td>
                                            </tr>
                                            <tr>
                                                <td>Teacher's Name</td>
                                                <td>{this.state.teacher_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Course Size</td>
                                                <td><input type="number" 
                                                        onChange={this.onChange} 
                                                        min="1" 
                                                        className="form-control" 
                                                        id="course_size" 
                                                        placeholder="CourseSize" 
                                                        name="course_size"
                                                        value={this.state.course_size}
                                                /></td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>{this.state.status === true ? "Active" : "Inactive"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="classroom-updateBtn">
                                <button type="submit" className="btn btn-success">Update The Course</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
    {getCourseType}
  )(withRouter(TeacherEditCourse));