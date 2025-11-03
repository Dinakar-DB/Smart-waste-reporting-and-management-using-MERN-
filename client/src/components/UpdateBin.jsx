import React, { useState,useEffect } from 'react';
import { Link ,useParams} from 'react-router-dom';

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



const UpdateBin = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [binData, setBinData] = useState({});
  
  const [editedBin, setEditedBin] = useState({
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
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBinDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/bin/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedBin({
            adminemail: data.adminemail  ,
            area: data.area  ,
            locality: data.locality ,         
            landmark: data.landmark ,
            city: data.city ,
            loadtype: data.loadtype ,
            driveremail: data.driveremail ,
            cycleperiod: data.cycleperiod ,
            bestroute: data.bestroute ,
          });
        }else {
          console.error('Error fetching business data:', response.statusText);
        } 
      } catch (error) {
        console.error('Error fetching business data:', error.message);
      }
    };

    fetchBinDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBin({
      ...editedBin,
      [name]: value,
    });
  };

  const handleUpdateBin  = async (e) =>  {
    e.preventDefault();
    try {

      // Mobile number validation
      {/*if (!/^\d{10}$/.test(editedBin.mobile)) {
        console.error('Mobile number must be a 10-digit number');
        //errors.mobile = 'Phone must be a 10-digit number';
        alert('Mobile number must be a 10-digit number');
        return;
      }*/}

      const response = await fetch(`http://localhost:4000/api/v1/bin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        //  'x-auth-token': token,
        },
        body: JSON.stringify(editedBin),
      });

      if (response.ok) {
        console.log('Bin details updated successfully!');
        alert("Updated successfully")
        // Add any additional logic you need after a successful update
        window.location.href = "/view_bin_admin";

      } else {
        console.error('Not updating bin details:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating bin details:', error.message);
    }
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
            <h6>Edit Bin details</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form onSubmit={handleUpdateBin} >
              
              <div className="mb-3">
                  <div className="title mb-2"><span>Admin Email</span></div>
                  <input className="form-control"
                    name="adminemail" id="adminemail"
                    value={editedBin.adminemail}
                    onChange={handleInputChange}    type="text" disabled  />
                </div>
              <div className="mb-3">
                  <div className="title mb-2"><span>Area</span></div>
                  <input className="form-control"
                    name="area" id="area"
                    value={editedBin.area}
                    onChange={handleInputChange}    type="text"  />
                </div>
                <div className="mb-3">
                  <div className="title mb-2"><span>Locality</span></div>
                  <input className="form-control" name="locality" id="locality"
                    value={editedBin.locality}
                    onChange={handleInputChange}   type="text"/>
                </div>


            
	  			 <div className="mb-3">
                    <div className="title mb-2"><span>Landmark</span></div>
                  <input className="form-control" name="landmark" id="landmark"
                    value={editedBin.landmark}
                    onChange={handleInputChange}   type="text"/>
                </div>

	    			
			  	 <div className="mb-3">
                  <div className="title mb-2"><span>City</span></div>
                  <input className="form-control" name="city" id="city"
                    value={editedBin.city}
                    onChange={handleInputChange}  type="text" />
                </div>

				 <div className="mb-3">
                  <div className="title mb-2"><span>Load Type</span></div>
                  <input className="form-control" name="loadtype" id="loadtype"
                    value={editedBin.loadtype}
                    onChange={handleInputChange}  type="text"/>
                </div>
            
                <div className="mb-3">
                  <div className="title mb-2"><span>Driver Email</span></div>
                  <input className="form-control" name="driveremail" id="driveremail"
                    value={editedBin.driveremail}
                    onChange={handleInputChange}   type="text"/>
                </div>          
                
                <div className="mb-3">
                  <div className="title mb-2"><span>Cycle Period</span></div>
                  <input className="form-control" name="cycleperiod" id="cycleperiod"
                    value={editedBin.cycleperiod}
                    onChange={handleInputChange}   type="text" />
                </div>

                <div className="mb-3">
                  <div className="title mb-2"><span>Best Route</span></div>
                  <input className="form-control" name="bestroute" id="bestroute"
                    value={editedBin.bestroute}
                    onChange={handleInputChange}  type="text" />
                </div>
  
                <button  className="btn btn-success w-100"  type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End
        */}



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

export default UpdateBin