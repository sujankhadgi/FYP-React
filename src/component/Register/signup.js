import React from "react";
import { Link } from "react-router-dom"
import "./signup.css"

class Signup extends React.Component {
    render() {
        return (
            <div className="login">
                <div className="signup-form">
                    <h4 className="signup-title"> Register Account </h4>

                    <input type="text" placeholder="First Name" name="first_name" className="signup-form-1" />
                    <input type="text" placeholder="Last Name" className="signup-form-2" />
                    <input type="text" placeholder="Contact Number" className="signup-form-3" />
                    <input type="text" placeholder="Address" className="signup-form-4" />
                    <input type="text" placeholder="Email" className="signup-form-5" />
                    <input type="Password" placeholder="Password" className="signup-form-6" />

                    <button className="signup-btn"> Register Now </button>
                    <Link to="/login" className="signup-link"> Have An Account? Login </Link>
                </div>
            </div>
        )
    }
}

export default Signup