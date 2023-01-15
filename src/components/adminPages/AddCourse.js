import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addCourse,logoutUser, getCourseType } from '../../actions/authentication';
 
class AddCourse extends Component{    
    
    constructor(props){
        super(props);

        this.state={
            course_id: "",
            course_name: "",
            teacher_name: "",
            course_size: "10",
            course_type: "",
            status: true
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
        const add_course = {
            course_id: this.state.course_id,
            course_name: this.state.course_name,
            teacher_name: this.state.teacher_name,
            course_size: this.state.course_size,
            course_type: this.state.course_type,
            status: this.state.status
        };
        this.props.addCourse(add_course, this.props.history);
    };

    componentDidMount() {
        
        const {getCourseType} = this.props;
        getCourseType();

      }

    render(){
        const {schema} = this.props.courses;

        return(
            <div className="addcourse" >
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="number"
                                    min="1" 
                                    onChange={this.onChange}
                                    className="form-control" 
                                    id="course_id" 
                                    placeholder="Course Id" 
                                    name="course_id"
                                    value={this.state.course_id}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" 
                                    onChange={this.onChange}
                                    className="form-control" 
                                    id="course_name" 
                                    placeholder="Course Name" 
                                    name="course_name"
                                    value={this.state.course_name}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    onChange={this.onChange} 
                                    className="form-control" 
                                    id="teacher_name" 
                                    placeholder="Teacher Name" 
                                    name="teacher_name"
                                    value={this.state.teacher_name}
                                    />
                            </div>
                            <div className="form-group">
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
                            </div>
                            <div className="form-group">
                                <input type="number" 
                                    onChange={this.onChange} 
                                    min="1" 
                                    className="form-control" 
                                    id="course_size" 
                                    placeholder="Course Size" 
                                    name="course_size"
                                    value={this.state.course_size}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" 
                                    onChange={this.onChange} 
                                    min="1" 
                                    className="form-control" 
                                    id="status" 
                                    name="status"
                                    readOnly
                                    value={this.state.status === true ? "Active" : "Inactive"}
                                    />
                            </div>
                            <button type="submit" className="btn btn-success">Add Course</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddCourse.propTypes = {
    addCourse: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    getCourseType: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    courses: state.courses
});


export default connect(
    mapStateToProps,
    {addCourse, logoutUser, getCourseType}
  )(withRouter(AddCourse));