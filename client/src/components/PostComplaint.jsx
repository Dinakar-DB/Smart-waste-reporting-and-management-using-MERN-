import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
{/*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

// useremail  complaint mobile lat long status

const PostComplaint = () => {
  const binarea = (document.cookie.replace(/(?:(?:^|.*;\s*)binarea\s*=\s*([^;]*).*$)|^.*$/, '$1'));
  const userEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));

  const [formData, setFormData] = useState({
    binarea: '',
    useremail: '',
    complaint: ''
  });
  


  const postComplaintData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:4000/api/v1/complaint/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          ...formData,
          binarea: binarea,
          useremail: userEmail,
        }),
      });

      if (response.ok) {
        console.log('Bin data posted successfully!');
        // Handle success, e.g., redirect to another page
        alert('Requested Successful');
        window.location.href = "view_complaints_user";

      } else {
        console.error('Error posting bin data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting bin data:', error.message);
    }
  };

  

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // OnForm Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    postComplaintData();
  };






 
 
  


  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">Garbage management</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>Post complaint</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>
  				
              <div className="mb-3">
                  <div className="title mb-2"><span>Complaint</span></div>
                  <input className="form-control"
                    name="complaint" id="complaint"
                    value={formData.complaint}
                    onChange={handleInputChange}    type="text"  />
                </div>
  				
      

                 
                <button className="btn btn-success w-100"  type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End*/}



        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/user_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default PostComplaint