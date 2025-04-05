import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "../App.css";
import { Link } from "react-router-dom";
import { getAll } from "./Actions";

function GetAll() {
  const Data = useSelector((state) => state.data.Data);
  const dispatch = useDispatch();

  useEffect(()=>{
    axios.get("http://localhost:8081/Data").then(
      (response)=>{dispatch(getAll(response.data))}
    ).catch()
  },[dispatch])

  const deleteHandler = async (id) => {
    const isConfirmed = window.confirm('Are you sure?');
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`http://localhost:8083/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>delete</th>
            <th>Update</th>
            <th>View</th>
            <th><Link className="btn" to='/add'>Add</Link></th>
          </tr>
        </thead>
        <tbody>
          {Data.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.age}</td>
              <td><button className="btn" onClick={()=>{deleteHandler(v.id)}}>delete</button></td>
              <td>
                <Link className="btn" to={`update/${v.id}`}>
                  Update
                </Link>
              </td>
              <td>
                <Link className="btn" to={`GetById/${v.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetAll;
