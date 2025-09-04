import './signup.css'
import React, { useEffect } from 'react';

const SignUp = (props) => {
    const { exit } = props;
    return(
        <div className="roundedBox">
            <div className="topBar">
                <p onClick={exit}>X</p>
                <h2>Sign Up</h2>
            </div>
            <form className="form">
                <label className="entry"> Username
                    <input type="text"/>
                </label>
                <label className="entry"> Password
                    <input type="text"/>
                </label>
            </form>
        </div>
    )
}

export default SignUp;