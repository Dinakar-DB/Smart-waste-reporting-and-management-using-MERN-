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
import imgService from "./img/trash.png";
import driver from "./img/bg-img/driver.png";
import updriver from "./img/shipment.png";
import imgPla from "./img/plastic.png";
import viewcomplaints from "./img/bg-img/review.png";
import workreport from "./img/bg-img/accountability.png";
import userdetails from "./img/user.png";
import imgReq from "./img/customerjourney.png";
import imgFeed from "./img/feedback.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const AdminHome = () => {
  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'black'}}><img src={imgSmall} alt=""/> <strong><Title /> </strong></div>
        
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
          <div className="section-heading d-flex align-items-center justify-content-center">
          <h3><div className="text-success">Admin Home</div></h3>
          </div>
         
          <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={imgService} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-success" to="/create_bin">
                   Create Bin </Link> 
                    </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={imgPla} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-success" to="/view_bin_admin">
                   Update Bin</Link> 
                    </div>
                </div>
              </div>
            </div>
            </div>

          

            <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={driver} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-success" to="/post_driver">
                   Add Driver</Link> 
                    </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={updriver} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-success" to="/view_driver">
                   View Driver</Link> 
                    </div>
                </div>
              </div>
            </div>
            </div>
           

            <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={viewcomplaints} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-success" to="/view_complaints_admin">
                   View Complaints</Link> 
                    </div>
                </div>
              </div>
            </div>
          
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={workreport} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-success" to="/view_work_report">
                   View Work report</Link> 
                    </div>
                </div>
              </div>
            </div>
            </div>


            <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={userdetails} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  className="text-success" to="/view_user_admin">
                   User Details</Link> 
                    </div>
                </div>
              </div>
            </div>
            </div>


            </div>
            </div>
            </div>

            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/admin_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li ><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default AdminHome