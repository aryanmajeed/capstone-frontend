import React, { useState } from 'react'
import axios from 'axios'
import makeToast from "../../Toaster";
import '../../styles/loginAndRegister.css';




export default function RegisterPage(props) {
    const [userState, setUserState] = useState({ email: '', password: '', repeatpassword: '', fname: '', lname: '', location: null, phone: '' });

    const handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        // setUserState({
        //     [name]: value, ...userState
        // });
        setUserState((prevUserState) => {
            return ({ ...prevUserState, [name]: value })
        });
        console.log(userState);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('The form was submitted with the following data:');

        axios.post('http://localhost:8000/user/register', userState)
            .then(response => {
                makeToast("success", response.data.message);
                console.log(props);
                props.signin();
                console.log("register success");
            })
            .catch(err => {
                makeToast("error", err.response.data.message);
                console.log("register failed", err)
            })

    }

    return (
        <div className="register-form-center">
            <form onSubmit={handleSubmit} className="register-form-fields">
                <div className="register-form-field" id="names">
                    <label className="register-form-label" htmlFor="fname">First Name</label>
                    <input type="text" id="fname" className="register-form-input" placeholder="Enter your first name" name="fname" value={userState.fname} onChange={handleChange} />
                </div>
                <div className="register-form-field" id="names">
                    <label className="register-form-label" htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" className="register-form-input" placeholder="Enter your last name" name="lname" value={userState.lname} onChange={handleChange} />
                </div>
                <div className="register-form-field">
                    <label className="register-form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="register-form-input" placeholder="Enter your password" name="password" value={userState.password} onChange={handleChange} />
                </div>
                <div className="register-form-field">
                    <label className="register-form-label" htmlFor="repeatpassword">Repeat Password</label>
                    <input type="password" id="repeatpassword" className="register-form-input" placeholder="Enter your password again" name="repeatpassword" value={userState.repeatpassword} onChange={handleChange} />
                </div>
                <div className="register-form-field">
                    <label className="register-form-label" htmlFor="email">E-Mail Address</label>
                    <input type="email" id="email" className="register-form-input" placeholder="Enter your email" name="email" value={userState.email} onChange={handleChange} />
                </div>
                <div className="register-form-field">
                    <label className="register-form-label" htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" className="register-form-input" placeholder="Enter your Phone Number" name="phone" value={userState.num} onChange={handleChange} />
                </div>
                <div className="register-form-field">
                    <button className="regitser-form-btn">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

