import React from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate,useParams  } from "react-router-dom";
import axios from "axios";  

const Viewlist = () => {
  //http://localhost:4000/api/v1/business/

  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  
  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
        fetch("http://localhost:4000/api/v1/business/" + id, {
            method: "DELETE"
        }).then((res) => {
            alert('Removed successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}

const LoadEdit = (id) => {
  navigate("/edit/" + id);
}

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:4000/api/v1/business/", requestOptions)
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/*
      {posts.map((post) => (
        <div key={post._id}>
          <h3>
          <p>{post.name}</p>
          </h3>
          <p>{post.description}</p>
          <p>{post.mechanicname}</p>
        </div>
      ))}

  */}

<h2>Business Details</h2>
<Link to="create" className="btn btn-success">Add New </Link>
<table className="table">
  <thead>
    <tr >
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Roll no</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    
  {posts && posts.map(item => (
                                    <tr key={item.id}>
                                      
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.mechanicname}</td>
                                        <td>
                                        <Link to={`/edit/${item.id}`}>
                                          <button>Edit</button>
                                        </Link>
                                            <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
  </tbody>
</table>

</div>



  );




};

export default Viewlist
