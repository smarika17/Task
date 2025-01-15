import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import AddEmployee from './component/AddEmployee';
import Navbar from './component/Navbar';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addemployee" element={<AddEmployee />} />
      </Routes>
    </>
  );
}

export default App;
