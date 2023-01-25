import React, {Component} from 'react';
import {getCourses} from '../../actions/authentication';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class DbAdmin extends Component{

    componentDidMount(){
        this.props.getCourses();
    }

    render(){

        const coursesAmount = this.props.courses.viewCourse;

        return(
            <div className="dashboard">
                <div className="row">
                    <div className="col-md-4">
                        <div className="db1">
                            <h4>All Current Courses</h4>
                            {coursesAmount.map(course => 
                            <li key={course._id}>
                              <Link to={`/view_Course_Details/${course._id}`}>{course.course_name}</Link>
                            </li>
                            )}
                        </div>
                    </div>
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
    {getCourses}
  )(withRouter(DbAdmin));
