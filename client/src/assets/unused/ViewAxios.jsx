import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewAxios = () => {
  //const { id } = useParams();
  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/business/`);
        if (response.status === 200) {
          setBusinessData(response.data);
        } else {
          console.error('Error fetching business data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching business data:', error.message);
      }
    };

    fetchBusinessData();
  }, []);

  return (
    <div>
      <h2>All Business Data</h2>
      {businessData.map((business) => (
        <div key={business._id}>
          <p>
            <strong>Name:</strong> {business.name}
          </p>
          <p>
            <strong>Description:</strong> {business.description}
          </p>
          <p>
            <strong>Mechanic Name:</strong> {business.mechanicname}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ViewAxios;
