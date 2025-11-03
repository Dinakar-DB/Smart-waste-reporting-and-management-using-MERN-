import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate ,Link } from 'react-router-dom';
import  { useState } from 'react';

import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
//import imgfolder from "./img/core-img/logout.png";

const Logout = () => {
  const history = useNavigate ();

  const handleLogout = () => {
    // Delete the cookies
    Cookies.remove('email');
    Cookies.remove('driveremail');
    Cookies.remove('adminemail');
    Cookies.remove('token'); // Add other cookies to delete if needed

    // Redirect to the login page or any other desired route
    //history.push('/');
     // Delete the token from localStorage
    localStorage.removeItem('token');

    alert('Logout Successful!');
    window.location.href = "/";
  };


  return (
    <div>

    <Link to="/" onClick= {handleLogout}><i className="lni lni-power-switch"></i>  Logout</Link>
    
    </div>
  );
};



{/*
const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    Cookies.remove('email');
    Cookies.remove('driveremail');
    Cookies.remove('adminemail');
    Cookies.remove('token');
    localStorage.removeItem('token');
    // Perform logout logic here
    // For example, clearing user authentication token, resetting user state, etc.

    // After performing the logout logic, you can redirect the user to the login page
    // Replace '/login' with the actual path of your login page
    //alert('Logout Successful!');
    window.location.href = '/';
  };

  return (
    
    <div >
      
      <button  onClick={() => setShowConfirmation(true)}  className="logout-button">
        <i className="lni lni-power-switch icon"></i>Logout</button>

      {showConfirmation && (
        <div className="confirmation-modal">
           <img className="big-logo" src={imgfolder} alt="" ></img> 
          <p>Are you sure you want to logout?</p>
          <button onClick={handleLogout} className="yes-button">Yes</button>
          <button onClick={() => setShowConfirmation(false)}className="no-button">No</button>
        </div>
      )}
    </div>
  );
};

*/}

export default Logout;
