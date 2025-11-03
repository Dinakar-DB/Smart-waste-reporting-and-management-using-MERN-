import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

  const Edit = () => {
    const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id; // Assuming you have a route parameter for the business ID


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mechanicname: '',
  });

  
  useEffect(() => {
    // Fetch the business data based on the ID when the component mounts
    const fetchBusinessData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/business/${id}`);
        if (response.ok) {
          const businessData = await response.json();
          setFormData({
            name: businessData.name,
            description: businessData.description,
            mechanicname: businessData.mechanicname,
          });
        } else {
          console.error('Error fetching business data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching business data:', error.message);
      }
    };

    fetchBusinessData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/v1/business/${id}`, {
        method: 'PUT', // Assuming you are using a PUT request for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successfully updated
        console.log('Business data updated successfully!');
        window.location.href = "/";
      } else {
        // Handle errors
        console.error('Error updating business data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating business data:', error.message);
    }
  };

  return (

    <form onSubmit={handleSubmit}>
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
    
      <button type="submit">Update</button>
    </form>


  );
};

export default Edit;
