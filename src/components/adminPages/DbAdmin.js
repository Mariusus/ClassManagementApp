import React, {Component} from 'react';
import {getCourses} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DbAdmin extends Component{

    componentDidMount(){
        this.props.getCourses();
    }

    render(){

        const coursesAmount = this.props.courses.viewCourse.length;

        return(
            <div className="dashboard">
                <div className="row">
                    <div className="col-md-4">
                        <div className="db1">
                            <h4>All Current Courses</h4>
                            <p>{coursesAmount}</p>
                           
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
