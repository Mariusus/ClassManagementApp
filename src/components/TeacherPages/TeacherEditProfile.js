import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authentication';

class TeacherEditProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            name: "",
            surname: "",
            email: "",
            gender: "Male",
            inCourse: "",
            status: "",
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

        axios.get('http://localhost:5000/edit_User/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    name: res.data.name,
                    surname: res.data.surname,
                    email: res.data.email,
                    gender: res.data.gender,
                    inCourse: res.data.inCourse,
                    status: res.data.status
                });
            })
            .catch((err) =>{
                console.log(err);
            })
      }

    onSubmit(e) {
    e.preventDefault();
    const updateUser = {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        gender: this.state.gender,
        inCourse: this.state.inCourse,
        status: this.state.status
        
    };
    
    axios.put('http://localhost:5000/update_Profile/'+this.props.match.params.id, updateUser)
        .then(res => console.log(res.data));
    
        this.props.logoutUser(this.props.history);
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <strong>Edit Student Profile</strong>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td>Student Name</td>
                                                <td>
                                                    <input type="text" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="name" 
                                                            placeholder="Name" 
                                                            name="name"
                                                            value={this.state.name}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Surname</td>
                                                <td>
                                                    <input  type="email" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="surname" 
                                                            placeholder="Surname" 
                                                            name="surname"
                                                            value={this.state.surname}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>
                                                    <input  type="email" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="email" 
                                                            placeholder="Email" 
                                                            name="email"
                                                            value={this.state.email}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Gednder</td>
                                                <td>
                                                    <select  type="text" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="gender" 
                                                            placeholder="Gender" 
                                                            name="gender"
                                                            value={this.state.gender}
                                                    >
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Enrolled Course</td>
                                                <td>
                                                    <input  type="text" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="inCourse" 
                                                            placeholder="Enrolled Course" 
                                                            name="inCourse"
                                                            value={this.state.inCourse}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>
                                                    <select  type="text" 
                                                            onChange={this.onChange}
                                                            className="form-control" 
                                                            id="status" 
                                                            placeholder="Status" 
                                                            name="status"
                                                            value={this.state.status}
                                                    >
                                                        <option>Graduated</option>
                                                        <option>Active</option>
                                                        <option>Paused</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Role</td>
                                                <td>
                                                    {this.props.auth.student.role}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="teacher-updateBtn">
                                <button type="submit" className="btn btn-success">UPDATE USER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

TeacherEditProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    courses: state.courses
});


export default connect(
    mapStateToProps,
    {logoutUser}
  )(withRouter(TeacherEditProfile));