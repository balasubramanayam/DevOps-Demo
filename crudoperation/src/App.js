import React from 'react'
import {  
  BrowserRouter,  
  Routes,  
  Route,  

}   from 'react-router-dom'
// import GetAll from './Redux/GetAll'
import GetAll from './ReactCrud/GetAll';
 import Add from './ReactCrud/Add';
import Update from './ReactCrud/Update';
import GetById from './ReactCrud/GetById';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetAll />} />
        <Route path='/add' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/GetById/:id' element={<GetById />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
