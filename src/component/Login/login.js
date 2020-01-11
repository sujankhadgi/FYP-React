import React from "react";
import { Link } from "react-router-dom"
import "./login.css"

class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <div className="login-form">
                    <h4 className="login-form-title"> Login Page </h4>
                    <input type="text" placeholder="Email" name="email" className="login-form-1" />
                    <input type="password" placeholder="Password" name="password" className="login-form-2" style={{ marginTop: "20px" }} />

                    <button className="login-form-btn" style={{ marginTop: "20px" }}> Login </button>


                    <Link to="/register" className="login-form-link"> Don't have Account? Register Now </Link>
                </div>
            </div>
        )
    }
}

export default Login