import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Add() {
  const [data, setData] = useState({ name: "", email: "" });
  const nav = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8088/users", data)
      .then((res) => {
        setData(res.data);
        alert("Data Added Successfully");
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form-container" style={{ marginTop: '2%' }}>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Enter the Name</label>
          <input type='text' id='name' name="name" value={data.name} onChange={handleChange} />
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='email'>Enter the email</label>
          <input type='text' id='email' name="email" value={data.email} onChange={handleChange} />
        </div>
        
        <br />
        <button className='btn' type='submit'>add</button>
      </form>
    </div>
  );
}

export default Add;
