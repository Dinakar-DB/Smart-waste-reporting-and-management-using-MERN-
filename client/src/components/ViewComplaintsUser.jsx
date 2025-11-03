import React, { useState, useEffect } from 'react';
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewComplaintsUser = () => {
    
  

  ////////////////////////////////////////////////
  //////////////Navgation Code Start//////////////
  ////////////////////////////////////////////////
  
  const [binId, setGeoLocation] = useState(''); // Set the initial value accordingly
  // Function to get user location and update on the server
  const getUserLocation = async () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          console.log(`ID: ${binId}`);
          updateLocationOnServer(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting user location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
   // Update location on the server
   async function updateLocationOnServer(latitude, longitude) {
  //  const binId = "6576e6dcfa3350243c6af5b3"; // Replace with the actual business ID
    const url = `http://localhost:4000/api/v1/location/map/` + complaintId;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers, such as authentication token if needed
        },
        body: JSON.stringify({
          lat: latitude,
          long: longitude,
        }),
      });
  
      if (response.ok) {
        alert("Location updated successfully!");
        console.log("Location updated successfully!");
        window.location.reload();
      } else {
        console.error(`Error updating location: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating location: ${error.message}`);
    }
  }
  // Trigger getUserLocation when businessId changes
  useEffect(() => {
    if (binId) {
      getUserLocation();
    }
  }, [binId]);

  ////////////////////////////////////////////////
  //////////////Navgation Code End ///////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  ////////////// Get Details Location ////////////
  ////////////////////////////////////////////////


  const [binData, setBinData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchBinData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/complaint/');
        const data = await response.json();

        // Assuming 'useremail' is the key in cookies
        const useremail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter location data based on vendoremail
         const filteredBin = data.filter((complaint) => complaint.useremail === useremail);
         setBinData(filteredBin);
         setFilteredData(filteredBin);
        
      } catch (error) {
        console.error('Error fetching location data:', error.message);
      
      }
    };

    fetchBinData();
  }, []);



  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = binData.filter((bin) =>
      Object.values(bin).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

          const timeOptions = { hour: '2-digit', minute: '2-digit' };


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
            <h6>My Complaints</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>

                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            <div className="row" style={{marginTop:10}}>
                {filteredData.map((complaint) => (
              <div key={complaint._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body">
                <a className="product-title d-block">Bin area:<b> {complaint.binarea} </b></a>
                      <a className="product-title d-block">user email:<b> {complaint.useremail} </b></a>
                      <a className="product-title d-block">Date:{new Date(complaint.dateCreated).toLocaleDateString('en-GB',timeOptions)}  </a>
                      <a className="product-title d-block">Complaint: {complaint.complaint}</a>
                      <a className="product-title d-block" style={{color:'green'}}>Status: <b>{complaint.status}</b>  </a>
                      </div>
                  </div> 
                     
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

export default ViewComplaintsUser