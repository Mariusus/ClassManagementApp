import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import ViewStudents from '../adminPages/ViewStudents';

class UserManage extends Component {

    render() {

        return (

            <div className="container">
                {}
                <div className="row">
                    <div className="col-md-12">
                        <ViewStudents />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserManage;