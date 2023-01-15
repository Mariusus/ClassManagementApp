import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { createCourseType } from '../../actions/authentication';


class CourseType extends Component{
    
    
    constructor(props){
        super(props);

        this.state={
            course_type: ""
        }
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
    
    onSubmit = e => {
        e.preventDefault();
        const addCourse_type = {
            course_type: this.state.course_type
        };
        this.props.createCourseType(addCourse_type, this.props.history);
    };

    render(){
        return(              <div className="courseType" >
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit}>
                         
                            <div className="form-group">
                                <input type="text" 
                                    onChange={this.onChange}
                                    className="form-control" 
                                    id="course_type" 
                                    placeholder="Enter A New Course Type" 
                                    name="course_type"
                                    value={this.state.course_type}
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Add New Type</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

CourseType.propTypes = {
    createCourseType: PropTypes.func.isRequired,
    //logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{createCourseType})(withRouter(CourseType));