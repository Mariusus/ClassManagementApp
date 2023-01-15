import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getCourseType} from '../../actions/authentication';

class EditCourse extends Component{

    constructor(props){
        super(props);
        this.state={
            course_id: "",
            course_name: "",
            teacher_name: "",
           course_type: "",
            course_size: ""
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

        axios.get('http://localhost:5000/get_Course_Type/'+this.props.match.params.id)
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
            course_id: this.state.course_id,
            course_name: this.state.course_name,
           teacher_name: this.state.teacher_name,
           course_type: this.state.course_type,
            course_size: this.state.course_size,
            status: this.state.status
        };
        axios.put('http://localhost:5000/update_Course/'+this.props.match.params.id, viewCourse)
            .then(res => console.log(res.data));
        
        this.props.history.push('/course_manage');
      }
     

    render(){

        const {schema} = this.props.courses;

        return(

            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-success text-white">
                                    <strong>Edit Course</strong>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td>Course ID</td>
                                                <td>
                                                    <input type="number"
                                                        min="1" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="course_id" 
                                                        placeholder="Course Id" 
                                                        name="course_id"
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
                                                        value={this.state.course_name}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Teachers Name</td>
                                                <td>
                                                    <input type="text"
                                                        onChange={this.onChange} 
                                                        className="form-control" 
                                                        id="teacher_name" 
                                                        placeholder="Teachers Name" 
                                                        name="teacher_name"
                                                        value={this.state.teacher_name}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Course Type</td>
                                                <td>
                                                    <select type="text" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="course_type" 
                                                        placeholder="Course Type" 
                                                        name="course_type"
                                                        value={this.state.course_type}
                                                    >
                                                    
                                                        {
                                                            schema.length > 0 && schema.map((el) =>{
                                                            return <option key={el}>{el}</option>
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Course Size</td>
                                                <td>
                                                    <input type="number" 
                                                        onChange={this.onChange} 
                                                        min="1" 
                                                        className="form-control" 
                                                        id="coursesize" 
                                                        placeholder="Course Size" 
                                                        name="course_size"
                                                        value={this.state.course_size}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>
                                                    <select type="text" 
                                                        onChange={this.onChange}
                                                        className="form-control" 
                                                        id="status"
                                                        name="status"
                                                        value={this.state.status}
                                                    >
                                                        <option>true</option> 
                                                        <option>false</option>  
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="admin-updateBtn">
                                <button type="submit" className="btn btn-success">Update Course</button>
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
  )(withRouter(EditCourse));