import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ViewCourseType from '../adminPages/ViewCourseType';

class TypeManage extends Component {

    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-12 courseadd">
                        <Link to='/add_Type' 
                            className="fas fa-plus btn btn-primary float-right">
                                Add Type
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ViewCourseType />
                    </div>
                </div>
            </div>
        )
    }
}

export default TypeManage;