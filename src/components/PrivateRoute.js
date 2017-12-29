import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import AppBarMain from "./ui-element/AppBarMain";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          {/* <AppBarMain /> */}
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
