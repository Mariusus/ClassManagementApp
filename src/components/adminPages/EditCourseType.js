import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {fetchCourseTypeView} from '../../actions/authentication';

class EditCourseType extends Component{

    constructor(props){
        super(props);
        this.state={
            course_type: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    componentDidMount() {

        axios.get('http://localhost:5000/edit_Course_Type/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    course_type: res.data.course_type
                });
            })
            .catch((err) =>{
                console.log(err);
            })
      }

    onSubmit(e) {
        e.preventDefault();
        const viewCourseType = {
            course_type: this.state.course_type
        };
        axios.put('http://localhost:5000/update_Course_Type/'+this.props.match.params.id, viewCourseType)
            .then(res => console.log(res.data));
        
        this.props.history.push('/type_manage');
      }
     

    render(){

        return(
           
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" 
                            onChange={this.onChange}
                            className="form-control" 
                            id="course_type" 
                            placeholder="Course Type" 
                            name="course_type"
                            value={this.state.course_type}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Update Course Type</button>
                </form>
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
    {fetchCourseTypeView}
  )(withRouter(EditCourseType));