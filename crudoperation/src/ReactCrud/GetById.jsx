import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function GetById() {
  const [data, setData] = useState({ name: "", email: "",password:""});
  const { id } = useParams();

  useEffect(() => {

    axios.get(`http://localhost:8088/users/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="form-container" style={{marginTop:'2%'}}>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={data.name} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={data.email} readOnly />
        </div>
        
        <Link to="/" className="btn">
          Get All
        </Link>
      </form>
    </div>
  );
}

export default GetById;
