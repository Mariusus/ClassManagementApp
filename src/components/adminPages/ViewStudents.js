import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getStudentUser} from '../../actions/authentication';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';

class ViewStudents extends Component{

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

    componentDidMount(){
        this.props.getStudentUser();
    }

    activeStudent(event,_id,status){
        event.preventDefault();
        
        const activeStudent = {
            status: !status
        };

        axios.put('http://localhost:5000/activeStudent/'+ _id, activeStudent)
            .then(res => {
                this.props.getStudentUser();
                });
        
        
    }

    render() {
    
        const studentData = this.props.auth.studentData.filter(
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
                        
                    <table className="table table-hover table-bordered view-student">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                                <th>Action</th>
                            </tr> 
                        </thead>
                        <tbody>
                        
                            {studentData.map((el) => {
                            return  <tr className="firstrow" key={el._id}>
                                        <td className="sno"></td>
                                         <td>{el.name.charAt(0).toUpperCase() + el.name.substring(1)}</td>
                                         <td>{el.surname.charAt(0).toUpperCase() + el.surname.substring(1)}</td>
                                        <td>{el.email}</td>
                                        <td>{el.gender}</td>
                                        <td>{el.phoneNo}</td>
                                        <td><Link   to={"/enrolled_Course/" + el._id} 
                                                    className="fas fa-atlas enrolledCourse"
                                                    title="Enrolled Course"
                                                    >
                                            </Link>
                                            <button  
                                                onClick={ (event) => this.activeStudent(event,el._id,el.status) } 
                                                className={el.status === inactive ? "fas fa-eye activeElement": "fas fa-eye-slash activeElement"}
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
//map function
// search
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    courses: state.courses
});


export default connect(
    mapStateToProps,
    {getStudentUser}
  )(withRouter(ViewStudents));
