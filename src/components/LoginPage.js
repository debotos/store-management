import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => (
  <div className="login-page">
    <div className="login-page-content">
      <h1 className="login-page-text">Store Management Software</h1>
      <div>
        <button className="btn-login" onClick={startLogin}>
          Login with Google
        </button>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
