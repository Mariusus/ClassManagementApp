import React from "react";
import { BrowserRouter as  Route, Redirect  } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && auth.student.role === 'Admin' ? 
      (
        <Component {...props} />
      )
      :
      auth.isAuthenticated === true && auth.student.role === 'Teacher' ? 
      (
        <Component {...props} />
      )
      :
      auth.isAuthenticated === true && auth.student.role === 'Student' ? 
      (
        <Component {...props} />
      )
      
      : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
}
);


export default connect(mapStateToProps)(PrivateRoute);
