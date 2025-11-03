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


const UpdateStatusAdmin = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  
  const [editedComplaint, setEditedComplaint] = useState({
    status: '',
  });
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/complaint/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedComplaint({
            status: data.status  ,
          });
        }else {
          console.error('Error fetching User data:', response.statusText);
        } 
      } catch (error) {
        console.error('Error fetching User data:', error.message);
      }
    };

    fetchComplaintDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedComplaint({
      ...editedComplaint,
      [name]: value,
    });
  };

  const handleUpdateComplaint  = async (e) =>  {
    e.preventDefault();
    try {

      const response = await fetch(`http://localhost:4000/api/v1/complaint/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(editedComplaint),
      });

      if (response.ok) {
        console.log('Status updated successfully!');
        alert('Status updated')
        // Add any additional logic you need after a successful update
        window.location.href = "/view_complaints_admin";

      } else {
        console.error('Not updating User details:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating User details:', error.message);
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
            <h6 className="user-name mb-1">Admin</h6>
         
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
            <h6>Update Status</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form onSubmit={handleUpdateComplaint} >
              <div className="mb-3">
                  <div className="title mb-2"><span>Update Status</span></div>
                  <select name="status" id="status"
                    value={editedComplaint.status}
                    onChange={handleInputChange}  >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="On Progress">On Progress</option>
                      <option value="Rejected">Rejected</option>
                    </select>         
                </div>
            
                <button  className="btn btn-success w-100"  type="submit">Submit</button> 
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

export default UpdateStatusAdmin