import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getCourses, removeCourse} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ViewCourses extends Component{

    constructor(props){
        super(props);
        this.state ={
            search: '',
            status: true
        }
    }

    updateSearch(event){

        this.setState({
            search: event.target.value.toLowerCase().substr(0,20)
        });
    }

    deleteCourse(event,_id,course_name) {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to delete  ${course_name} course?`,
            )
        ){   
            this.props.removeCourse(_id);
            this.props.getCourses();
       } 
    }

    componentDidMount(){
        this.props.getCourses();

    }

    activeCourse(event,_id,status){
        event.preventDefault();
        
        const activeCourse = {
            status: !status
        };

        axios.put('http://localhost:5000/activeCourse/'+ _id, activeCourse)
            .then(res => {
                    this.props.getCourses();
                });
        
        
    }

    render() {
        const viewCourse = this.props.courses.viewCourse.filter(
            (el) =>
            {
                // return Object.keys(el).some(key =>
                //     el[key].toString().toLowerCase().includes(this.state.search.toLowerCase())
                //   );
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
                            return  <tr className="firstrow" key={el._id}>
                                        <td className="sno"></td>
                                        <td>{el.course_name.charAt(0).toUpperCase() + el.course_name.substring(1)}</td>
                                       <td>{el.course_type.charAt(0).toUpperCase() + el.course_type.substring(1)}</td>
                                        <td>{el.teacher_name.charAt(0).toUpperCase() + el.teacher_name.substring(1)}</td>
                                        <td>{el.course_size}</td>
                                        <td><Link   to={"/edit_Course/" + el._id} 
                                                    className="far fa-edit editCourse"
                                                    title="Edit Course"
                                            >
                                            </Link>
                                            <Link to='/' 
                                                onClick={ (event) => this.removeCourse(event,el._id, el.course_name) } 
                                                className="far fa-trash-alt deleteCourse"
                                                title="Delete Course"
                                            >
                                            </Link>
                                            <Link to={"/view_Course_Details/" + el._id} 
                                                className="fas fa-address-course detailCourse"
                                                title="Course Details"
                                            >
                                            </Link>
                                            <button  
                                                onClick={ (event) => this.activeCourse(event,el._id,el.status) } 
                                                className={el.status === true ? "fas fa-eye activeElement": "fas fa-eye-slash activeElement"}
                                                title={el.status === true ? "Active" : "Inactive"}
                                            >
                                            </button>
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
    {getCourses,removeCourse}
  )(withRouter(ViewCourses));