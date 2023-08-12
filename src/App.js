import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import DataEntry from './components/dataEntry';
import LineGraph from './components/lineGraph';
import Login from './components/login';
import Navbar from './components/navbar';
import { BrowserRouter, Router, Switch, Route, Routes, Redirect } from 'react-router-dom';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<DataEntry />} />
        <Route path="/admin" element={<LineGraph />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
