import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {getCourses} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ViewCourseDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            course_id: "",
            course_name: "",
            teacher_name: "",
            course_type: "",
            course_size: "",
            status: "",
          //  editedBy: ""
        }
    }

    componentDidMount(){

        axios.get('http://localhost:5000/view_Course_Details/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                  course_id: res.data.course_id, 
                  course_name: res.data.course_name,
                  teacher_name: res.data.teacher_name,
                  course_type: res.data.course_type,
                  course_size: res.data.course_size,
                  status: res.data.status,
                //  editedBy: res.data.editedBy.teacher_name
                });
            })
            .catch((err) =>{
                console.log(err);
            })
    }

    render() {
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-success text-white"><strong>View Course Details</strong></div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Course ID</td>
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
                                            <td>Teacher Name</td>
                                            <td>{this.state.teacher_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Course Size</td>
                                            <td>{this.state.course_size}</td>
                                        </tr>
                                        <tr>
                                            <td>Edited By</td>
                                            <td>{this.state.editedBy}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{this.state.status.toString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state,props)=> ({
    auth: state.auth,
    errors: state.errors,
    courses: state.courses
});


export default connect(
    mapStateToProps,
    {getCourses}
  )(withRouter(ViewCourseDetails));