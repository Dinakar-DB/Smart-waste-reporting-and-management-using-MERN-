import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
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

const ViewBinDriver = () => {


  ////////////////////////////////////////////////
  //////////////Navgation Code Start//////////////
  ////////////////////////////////////////////////
  
  const [binId, setBinId] = useState(''); // Set the initial value accordingly
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
  //  const binId = "6576e6dcfa3350243c6af5b3"; // Replace with the actual bin ID
    const url = `http://localhost:4000/api/v1/bin/map/` + binId;
  
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
  //////////////Update Code ///////////////
  ////////////////////////////////////////////////

  

const [binarea, LoadEdit] = useState(''); // Set the initial value accordingly
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
    window.location.href = ("/updatestatus_driver");
  };
  


  const [binData, setBinData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBinData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/bin/');
        const data = await response.json();

        // Assuming 'adminemail' is the key in cookies
        const driveremail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)driveremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter bin data based on adminemail
         const filteredBin = data.filter((bin) => bin.driveremail === driveremail);
         setBinData(filteredBin);
         setFilteredData(filteredBin);
         setLoading(false);
      } catch (error) {
        console.error('Error fetching bin data:', error.message);
        setLoading(false);
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
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
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
          <li><Link to="/driver_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>View Bin details</h6>
			
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

            {/* Show if Null data in table */}

            {filteredData.length > 0 ? (
            <div className="row" style={{marginTop:10}}>
            {/* Get Details Map field and id */}          
                {filteredData.map((bin) => (
              <div key={bin._id} className="col-12 col-md-6">                                        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block"  >Driver E-Mail:  <b> {bin.driveremail} </b></a>
                      <a className="product-title d-block"  >Bin Name:  <b> {bin.area} </b></a>
                      <a className="product-title d-block"  >Locality :  <b>  {bin.locality} </b></a>
                      <a className="product-title d-block"  >Landmark: {bin.landmark}  </a>
                      <a className="product-title d-block"  >City: {bin.city} </a>
                      <a className="product-title d-block"  >Load type:  {bin.loadtype} </a>	
                      <a className="product-title d-block"  >Cycle period: {bin.cycleperiod} </a>
                      <a className="product-title d-block"  >Best route: {bin.bestroute} </a>
                      <a className="product-title d-block"  >Lat: {bin.lat}  </a>
                      <a className="product-title d-block"  >Long: {bin.long}  </a>
                    </div>
                  </div>   
                  
                  <a className="btn btn-danger" onClick={() => { LoadEdit(bin.area) }}>Update</a>
                 <a className="btn btn-danger" target="_blank"
                  href={`https://maps.google.com/?q=${bin.lat},${bin.long}`}>
                  Show Map
                </a>
              </div>
              ))}

              
        </div>
                  ) : (
                    <p>No bin details found for the specified driver email or search term.</p>
            )}

           {/* Show if Null data in table */}

        </div>
    </div>


            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/driver_home" ><i className="lni lni-home"></i>Home </Link> </li>
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

export default ViewBinDriver