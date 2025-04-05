import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
function GetAll() {
  const [data, setData] = React.useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8088/users')
    .then((res)=>{
      setData(res.data);
      console.log(res.data);})
    .catch((err)=>{
      console.log(err)})
  },[])

  const deleteHandler=(id)=>{
    if(window.confirm('Are you sure?')){
    
      axios.delete(`http://localhost:8088/users/${id}`)
      .then(() => {
                setData(data);
              })
      .catch((err) => {
                console.log(err);
              });
          }
    }
  

  return (
    <div className="table-container">
      
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          
            <th>Update</th>
            <th>View</th>
            <th>Delete</th>
            <th><Link className="btn" to="/add">add</Link></th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.email}</td>
             
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
              <td>
                {" "}
                <button
                  className="btn delete-btn"
                  onClick={() => deleteHandler(v.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetAll;
