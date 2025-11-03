import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewBinUser = () => {
  
  const [binData, setBinData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBinData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/bin/`);
        if (response.status === 200) {
          setBinData(response.data);
        } else {
          console.error('Error fetching bin data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching bin data:', error.message);
      }
    };

    fetchBinData();
  }, []);

   // Filter data based on the search term
   const filteredData = binData.filter((bin) =>{ 
        const isMatch = Object.values(bin).some((field) =>
     field.toString().toLowerCase().includes(searchTerm.toLowerCase() )
     );

    
    return isMatch;
  });  

  const handleCall = () => {
    window.location.href = `tel:${bin.mobile}`;
  };


  ////////////////////////////////////////////////
  ///////Get User Email ID and Store////////////
  ////////////////////////////////////////////////  

  
  const [binarea, setShareLocation] = useState(''); // Set the initial value accordingly
  // Trigger getUserLocation when businessId changes
  useEffect(() => {
    if (binarea) {
      shareLocation();
    }
  }, [binarea]);

  const shareLocation = () => {
    // Assuming business.adminemail contains the vendor's email
    // Store adminemail in cookies
    document.cookie = `binarea=${binarea}`;
    // For example, redirect to another page
    window.location.href = '/post_complaint';
  };

  

  ////////////////////////////////////////////////
  /////// Set Cookies ///////
  ////////////////////////////////////////////////
  


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
            <h6>New complaint</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>
                  <input className="form-control"  type="text"  placeholder="Search..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            <div className="row" style={{marginTop:10}}>
                {filteredData.map((bin) => (
              <div key={bin._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block">Bin Name: <b>{bin.area}</b></a>
                      <a className="product-title d-block">Locality: <b>{bin.locality}</b></a>
                      <a className="product-title d-block">Landmark: <b>{bin.landmark}</b></a>
                      <a className="product-title d-block">City: <b>{bin.city}</b></a>
                      <hr></hr>
                      <a className="product-title d-block"  > Bin Location:-  </a>
                      <a className="product-title d-block"  >Lat: <b>{bin.lat}</b> | Long: <b>{bin.long}</b> </a>
                      
                    </div>
                  </div>   
                  
            <a className="btn btn-danger"onClick={() => setShareLocation(bin.area)} >Ticket</a>
            <a className="btn btn-danger" target="_blank"
                  href={`https://maps.google.com/?q=${bin.lat},${bin.long}`}>
                  Show Map
                </a>

              </div>
              ))}
              
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
</div>
  )
}

export default ViewBinUser