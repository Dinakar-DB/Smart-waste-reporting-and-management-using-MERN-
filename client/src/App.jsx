import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import UserRegister from  "./components/UserRegister";
import UserHome from  "./components/UserHome";
import UserProfile from './components/UserProfile';
import EditUserProfile from './components/EditUserProfile';
import Index from './components/Index';
import AdminHome from './components/AdminHome';
import UpdateStatusAdmin from './components/UpdateStatusAdmin';
import ViewUserAdmin from './components/ViewUserAdmin';
import DriverHome from './components/DriverHome';
import DriverLogin from './components/DriverLogin';
import PostDriver from './components/Postdriver';
import ViewDriver from './components/ViewDriver';
import UpdateDriver from './components/UpdateDriver';
import PostComplaint from './components/PostComplaint';

import ViewWorkReport from './components/ViewWorkReport';
import ResetPassword from './components/ResetPassword';
import CreateBin from './components/CreateBin';
import UpdateBin from './components/UpdateBin';
import UserLogin from './components/UserLogin';
import ViewBinAdmin from './components/ViewBinAdmin';
import ViewBinUser from './components/ViewBinUser';
import ViewBinDriver from './components/ViewBinDriver';
import ViewComplaintsUser from './components/ViewComplaintsUser';
import ViewComplaintsAdmin from './components/ViewComplaintsAdmin';
import UpdatestatusDriver from './components/UpdatestatusDriver';
import MapComponent from './components/MapComponent';

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
      
            <Route path='/' element={<Index />} />
            <Route path='/view_user_admin' element={<ViewUserAdmin />} />
            <Route path='/update_status_admin/:id' element={<UpdateStatusAdmin />} />
            <Route path='/view_complaints_user' element={<ViewComplaintsUser />} />
            <Route path='/user_profile' element={<UserProfile />} />
            <Route path='/edit_userprofile/:id' element={<EditUserProfile />} />
            <Route path='/user_home' element={<UserHome />} />         
            <Route path='/user_register' element={<UserRegister />} />
            <Route path='/create_bin' element={<CreateBin />} />
            <Route path='/view_bin_admin' element={<ViewBinAdmin/>}/>
            <Route path='/update_bin/:id' element={<UpdateBin/>}/>
            <Route path='/admin_login' element={<AdminLogin />} />
            <Route path='/admin_home' element={<AdminHome />} />
            <Route path='/driver_home' element={<DriverHome/>}/>
            <Route path='/driver_login' element={<DriverLogin/>}/>
            <Route path='/post_driver' element={<PostDriver />} />
            <Route path='/view_driver' element={<ViewDriver/>} />
            <Route path='/update_driver/:id' element={<UpdateDriver/>} />
            <Route path='/view_bin_user' element={<ViewBinUser/>}/>
            <Route path='/post_complaint' element={<PostComplaint/>}/>
            <Route path='/view_complaints_admin' element={<ViewComplaintsAdmin/>}/>
            <Route path='/view_bin_driver' element={<ViewBinDriver/>}/>
            <Route path='/updatestatus_driver' element={<UpdatestatusDriver/>}/>
            <Route path='/view_work_report' element={<ViewWorkReport/>}/>
            <Route path='/reset_password' element={<ResetPassword/>}/>
            <Route path='/user_login' element={<UserLogin/>}/>
            <Route path='/map/:id' element={<MapComponent/>}/>

          </Routes>
        </BrowserRouter>
      </div>
    );
}



export default App;

{/*
unused 
import Viewlist from "./assets/unused/Viewlist";
import Edit from "./assets/unused/Edit";
import CreateBusiness from "./assets/unused/CreateBusiness";
import ViewAxios from "./assets/unused/ViewAxios";

<Route path='/viewtest' element={<Viewlist />} />            
<Route path='/axios' element={<ViewAxios />} />
<Route path='/create' element={<CreateBusiness />} />          
<Route path='/edit/:id' element={<Edit />} />

*/}