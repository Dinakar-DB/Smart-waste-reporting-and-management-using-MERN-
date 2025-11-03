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
import imgBack from "./img/bg-img/gar.jpg";
import imgMech from "./img/mechanic.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const Index = () => {
  return (
    <div>
      
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'black'}}><img src={imgSmall} alt=""/><strong> <Title /> </strong></div>
        
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
            <h6 className="user-name mb-1">Garbage management app</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/user_register">User Register</Link></li>
          {/*<li><Link to="/user_register">User Register</Link></li>*/}
    
          </ul>
      </div>
    </div>
      </div>
    </div>

      <div className="container ">
        <div className="pt-3">
            <div className="single-hero-slide" >
                <img src={imgBack} className="img-fluid"   />
            </div>            
      </div>
      </div>


      <div className="product-catagories-wrapper py-3 justify-content-center text-center">
        <div className="container">
          <div className="section-heading">

          </div>
          <div className="product-catagory-wrap">
            <div className="row g-3">
              <div className="col-6">
                <div className="card catagory-card">
               <Link to="/user_login" className="btn btn-warning btn-lg w-100">
                    User </Link>
                </div>
              </div>
			   <div className="col-6">
                <div className="card catagory-card">
                  <Link to="/driver_login" className="btn btn-warning btn-lg w-100" >
                    Driver </Link>
                </div>
              </div>
			   <div className="col-6">
                <div className="card catagory-card">
					      <Link to="/admin_login" className="btn btn-warning btn-lg w-100" >
                    Admin</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




</div>
  )
}

export default Index