import React from 'react'
import '../css/navbar.css';
import mainlogo from '../assets/mainlogo.png';

export default function Navbar() {
    return (
        <div className='navbar'>

            <a href="https://shubhamrastogi.netlify.app/">

                <div className="brand-wrapper">
                    <div className="main-logo-wrapper">
                        <img src={mainlogo} alt="logo" id='mainlogo' />
                    </div>
                    <h6 id="brand-para">
                        TALK AI
                    </h6>
                </div>
            </a>

        </div >
    )
}