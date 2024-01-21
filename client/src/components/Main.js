import React from 'react'
import '../css/main.css';
import { useState } from 'react';
import axios from 'axios';
import mainlogo from '../assets/mainlogo.png';

export default function Main() {
    const [ email, setEmail ] = useState('');
    const [ pass, setPass ] = useState('');

    let emailChange = (e) => {
        setEmail(e.target.value);
    }
    let passwordChange = (e) => {
        setPass(e.target.value);
    }
    let loginHandler = async (e) => {
        e.preventDefault();
        if (email === '' || pass === '') {
            alert("please fill the details first");
            return;
        }
        let Email = email;
        await axios.post("https://goodspace-task-sd34.onrender.com/login", {
            data: {
                email: Email,
                password: pass
            }
        }).then(res => {
            localStorage.setItem('username', res.data.username);
            if (res.data.username !== null)
                window.location = 'https://shubhamrastogi.netlify.app/speech';
            else
                window.location = 'https://shubhamrastogi.netlify.app/';
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='main'>
            <div className="left-part">
                <div className="main-logo-wrapper-main">
                    <img src={mainlogo} alt="logo" id='mainlogo' />
                </div>


                <h2 className="first-text">
                    Welcome to
                </h2>
                <h2 className="second-text">
                    TALK AI Communications
                </h2>
            </div>
            <form className="right-part">
                <div className="signup-container">
                    <h2 className="signup-heading">
                        Signup / Login
                    </h2>
                    <div className='signup-label-container'>
                        <label className='signup-label' htmlFor="email">Your Email ID</label>
                    </div>
                    <div className="input-container">
                        <input value={email} onChange={emailChange} required="true" className='signup-input' type="email" name="email" id="email" />
                    </div>
                    <div className='signup-label-container'>
                        <label className='signup-label ' htmlFor="password">Password</label>
                    </div>
                    <div className="input-container">
                        <input value={pass} onChange={passwordChange} required="true" className='signup-input' type="password" name="password" id="password" />
                    </div>
                    <div className="button-container">
                        <button onClick={loginHandler} className='signup-button' type='submit'>Lets Go!!</button>
                    </div>
                </div>
            </form>
        </div>
    )
}