import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCourseTypeView, deleteCourseType } from '../../actions/authentication';


class ViewCourseType extends Component{

    deleteCourseType(event,_id,course_type) {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to delete  ${course_type} type permanently?`,
            )
        ){   
            this.props.deleteCourseType(_id);
       } 
    }

    componentDidMount() {
        const {fetchCourseTypeView} = this.props;
        fetchCourseTypeView();

    }
    render() {
        const {courseType} = this.props.courses;

        return(

                <div>
                    <input type="text"
                    className="float-right searchBox"
                    placeholder="Search for..."
                    // value={this.state.search}
                    // onChange = {this.updateSearch.bind(this)}
                    />
                        
                    <table className="table table-hover table-bordered view-course">
                        <thead>
                            <tr>
                                <th className="text-center">S.No.</th>
                                <th>Course Type</th>
                                <th>Action</th>
                            </tr> 
                        </thead>
                        <tbody>
                                {courseType.map((el) =>{
                                    return <tr className="firstrow" key={el._id}>
                                        <td className="sno text-center"></td> 
                                        <td>{el.course_type.charAt(0).toUpperCase() + el.course_type.substring(1)}</td>
                                        <td><Link   to={"/edit_Course_Type/" + el._id} 
                                                    className="far fa-edit editCourse">
                                            </Link>
                                            <Link to='/' 
                                                onClick={ (event) => this.deleteCourseType(event,el._id, el.course_type) }
                                                className="far fa-trash-alt deleteCourse">
                                            </Link>
                                        </td>
                                    </tr>
                                })}     
                        </tbody>
                    </table>
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
    {fetchCourseTypeView,deleteCourseType}
  )(withRouter(ViewCourseType));
