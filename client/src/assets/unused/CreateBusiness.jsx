import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const CreateBusiness = () => {

  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  } 

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mechanicname: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/business/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successfully submitted
        console.log('Form data submitted successfully!');
        //history.push('/'); // Redirect to the home page
        window.location.href = "/";

      } else {
        // Handle errors
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }


  };


  return (
    <form onSubmit={handleSubmit}>
      {/* Name Field */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Mechanic Name Field */}
      <div>
        <label htmlFor="mechanicname">Mechanic Name:</label>
        <input
          type="text"
          id="mechanicname"
          name="mechanicname"
          value={formData.mechanicname}
          onChange={handleInputChange}
          required
        />
      </div>
      
      {/* Submit Button */}
      <button type="submit"  onClick={routeChange} >Submit</button>
    </form>
  );


};

export default CreateBusiness;

