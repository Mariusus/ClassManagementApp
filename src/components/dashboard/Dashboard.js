import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import {withRouter } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import AddCourse from '../adminPages/AddCourse';
import { HashRouter, Route,Link, Switch } from "react-router-dom"
import DbAdmin from "../adminPages/DbAdmin";
import CourseType from '../adminPages/CourseType'; 
import ViewCourses from "../adminPages/ViewCourses";
import CourseManage from "../adminPages/CourseManage";
import EditCourse from '../adminPages/EditCourse';
import TypeManage from '../adminPages/TypeManage';
import viewCourseType from '../adminPages/ViewCourseType';
import EditCourseType from '../adminPages/EditCourseType';
import ViewCourseDetails from '../adminPages/ViewCourseDetails';
import UserManage from '../adminPages/UserManage';
import ViewStudentEnrolls from '../adminPages/ViewStudentEnrolls';
import ViewCourseType from "../adminPages/ViewCourseType";
    
class Dashboard extends Component {


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
                            <h3>Quick Actions</h3>
                            <hr/>
                            <Switch>
                            <Route exact path='/' component={DbAdmin}/>
                               <Route path='/add_Course' component={AddCourse} />  
                             <Route path='/add_Type' component={CourseType} />   
                                <Route path='/view_Courses' component={ViewCourses} />
                                <Route path='/course_Manage' component={CourseManage} />
                                <Route path='/type_Manage' component={TypeManage} />
                                <Route path='/edit_Course/:id' component={EditCourse} />
                                <Route path='/view_Course_Type' component={ViewCourseType} />
                                <Route path='/edit_Course_Type/:id' component={EditCourseType} />
                                <Route path='/View_Course_Details/:id' component={ViewCourseDetails} />
                                <Route path='/user_Manage' component={UserManage} />
                                <Route path='/view_Student_Enrolls/:id' component={ViewStudentEnrolls} />
                            </Switch>
                        </div>
                    </div>
                    
                </div>
                </HashRouter>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{logoutUser})(withRouter(Dashboard));