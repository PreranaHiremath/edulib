import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the educational library</h1>
      <Header/>
      <Outlet />
      
    </div>
  );
};



export default Home