import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

class TeacherProfile extends Component {

    onChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value 
        });
    };
    

    render(){
            console.log(this.props)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 editStudent">
                        <Link to={"/teacher_profile/" + this.props.auth.student.id} 
                            className="far fa-edit btn btn-success float-right">
                                &nbspsp;&nbsp;Edit Teacher Details
                        </Link>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header bg-primary text-white">
                                        <strong>Teacher Profile</strong>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td> Name</td>
                                                    <td>
                                                        {this.props.auth.student.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td> Surname</td>
                                                    <td>
                                                        {this.props.auth.student.surname}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>
                                                        {this.props.auth.student.email}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Gender</td>
                                                    <td>
                                                        {this.props.auth.student.gender}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>ROLE</td>
                                                    <td>
                                                        {this.props.auth.student.role}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Enrolled Course</td>
                                                    <td>
                                                        {this.props.auth.student.inCourse}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Student Status</td>
                                                    <td>
                                                        {this.props.auth.student.status}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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
    mapStateToProps
  )(withRouter(TeacherProfile));