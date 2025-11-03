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

 

const CreateBin = () => {

  const [formData, setFormData] = useState({
    adminemail:'',
    area:'',
    locality:'',
    landmark:'',
    city:'',
    loadtype:'',
    driveremail:'',
    cycleperiod:'',
    bestroute:''
  });

  const [validationErrors, setValidationErrors] = useState({});


  const postbinData = async () => {
    const token = localStorage.getItem('token');
    const adminEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)adminemail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    //console.log(adminEmail);  // Output: admin@gmail.com

    try {
      const response = await fetch('http://localhost:4000/api/v1/bin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          ...formData,
          adminemail: adminEmail,
        }),
      });

      if (response.ok) {
        console.log('Created Bin successfully!');
        // Handle success, e.g., redirect to another page
        alert('Created Successfully');
        window.location.href = "/view_bin_admin";

      } else {
        console.error('Error posting business data:', response.statusText);
      }
    } catch (error) {
      console.error(' Route Error posting Bin data:', error.message);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
        // Reset validation error htmlFor the current field when it's being modified
        setValidationErrors({
          ...validationErrors,
          [name]: '',
        });

  };


        // OnForm Submit
  const handleSubmit = (e) => {
    e.preventDefault();
   
    postbinData();
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
            <h6 className="user-name mb-1">Garbage managemant</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>Add Bin details</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>
              
            <div className="mb-3">
                  <div className="title mb-2"><span>Create Bin</span></div>
                  <input className="form-control"
                    name="area" id="area"
                    value={formData.area}
                    onChange={handleInputChange}    type="text"  />
                </div>
                <div className="mb-3">
                  <div className="title mb-2"><span>Locality</span></div>
                  <input className="form-control" name="locality" id="locality"
                    value={formData.locality}
                    onChange={handleInputChange}   type="text"/>
                </div>
	  

              <div className="mb-3">
                  <div className="title mb-2"><span>Landmark</span></div>
                  <input className="form-control" name="landmark" id="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}   type="text" />
                </div>

	    			<div className="mb-3">
                  <div className="title mb-2"><span>City</span></div>
                  <input className="form-control" name="city" id="city"
                    value={formData.city}
                    onChange={handleInputChange}   type="text" />
                </div>

            <div className="mb-3">
                  <div className="title mb-2"><span>Load type</span></div>
                    <select name="loadtype" id="loadtype"
                    value={formData.loadtype}
                    onChange={handleInputChange}>
                          <option value="">Load type</option>
                          <option value="Daily">Low</option>
                          <option value="Twice">Medium</option>
                          <option value="Weekly">High</option>
							        </select>
                </div>

            <div className="mb-3">
                  <div className="title mb-2"><span>Asssign Driver's email</span></div>
                  <input className="form-control" name="driveremail" id="driveremail"
                    value={formData.driveremail}
                    onChange={handleInputChange}   type="text" />
                </div>

                
            <div className="mb-3">
                  <div className="title mb-2"><span>Cycle period</span></div>
                    <select name="cycleperiod" id="cycleperiod"
                    value={formData.cycleperiod}
                    onChange={handleInputChange}    >
                          <option value="">Cycle Period</option>
                          <option value="Daily">Daily</option>
                          <option value="Twice">Twice</option>
                          <option value="Weekly">Weekly</option>
							        </select>
                </div>
        

            <div className="mb-3">
                  <div className="title mb-2"><span>Best route</span></div>
                  <textarea className="form-control" name="bestroute" id="bestroute"
                    value={formData.bestroute}
                    onChange={handleInputChange}   type="text" />
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
                    <li className="active"> <Link to="/admin_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default CreateBin