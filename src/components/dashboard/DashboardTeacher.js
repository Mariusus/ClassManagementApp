import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, HashRouter, Link } from "react-router-dom";
import Sidebar from '../layout/Sidebar';

import TeacherCourseManage from '../TeacherPages/TeacherCoursesManage';
import TeacherViewCourse from '../TeacherPages/TeacherViewCourse';
import TeacherEditCourse from '../TeacherPages/TeacherEditCourse';
import TeacherAddCourse from '../TeacherPages/TeacherAddCourse';
import TeacherProfile from '../TeacherPages/TeacherProfile';
import TeacherEditProfile from '../TeacherPages/TeacherEditProfile';
import DbTeacher from '../TeacherPages/DbTeacher';

class DashboardTeacher extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render(){

        return(
            <div className="container-fluid pl-0">
                <HashRouter>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="dashboard-rightbar">
                            <h3>Teacher Actions</h3>
                            <hr/>
                            <Switch>
                               
                                <Route path='/teacher_course_manage' component={TeacherCourseManage} />
                                <Route path='/teacher_view_course' component={TeacherViewCourse}/>
                                <Route path='/teacher_edit_course/:id' component={TeacherEditCourse} />
                                <Route path='/teacher_add_course' component={TeacherAddCourse} />
                                <Route path='/teacher_profile' component={TeacherProfile} />
                                <Route path='/edit_User/:id' component={TeacherEditProfile} />
                                <Route  exact path='/' component={DbTeacher}/>
                            </Switch>

                        </div>
                    </div>
                </div>
                </HashRouter>
            </div>
        );
    }
}

DashboardTeacher.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(withRouter(DashboardTeacher));