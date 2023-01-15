import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getCourses} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TeacherViewCourse extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }
    }

    updateSearch(event){

        this.setState({
            search: event.target.value.toLowerCase().substr(0,20)
        });
    }

    componentDidMount(){
        this.props.getCourses();
    }

    render() {
        const viewCourse = this.props.courses.viewCourse.filter(
            (el) =>
            {
                return Object.keys(el).some(key => el[key].toString().toLowerCase().search(this.state.search.toLowerCase()) !== -1);
            }
        );
        
        return(
            <div>
                    
                    <input type="text"
                    className="float-right searchBox"
                    placeholder="Search for..."
                    value={this.state.search}
                    onChange = {this.updateSearch.bind(this)}
                    />
                        
                    <table className="table table-hover table-bordered view-course">
                        <thead>
                            <tr>  
                            <th>Course Id</th> 
                             <th>Course Name</th>                                         
                             <th>Course Type</th>
                             <th>Teacher Name</th> 
                             <th>Course Size</th>
                            </tr> 
                        </thead>
                        <tbody>
                   
                            {viewCourse.map((el) => {
                                console.log(el)
                            return  <tr className="firstrow" key={el._id}>
                                        <td className="sno"></td>
                                       <td>{el.course_name.charAt(0).toUpperCase() + el.course_name.substring(1)}</td>
                                       <td>{el.course_type.charAt(0).toUpperCase() + el.course_type.substring(1)}</td>
                                        <td>{el.teacher_name.charAt(0).toUpperCase() + el.teacher_name.substring(1)}</td>
                                        <td>{el.course_size}</td>
                                        <td><Link   to={"/teacher_edit_course/" + el._id}  
                                                    className="far fa-edit editCourse">
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
    {getCourses}
  )(withRouter(TeacherViewCourse));
