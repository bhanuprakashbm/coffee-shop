import React from 'react';
import Landing from '../components/Landing/Landing';
import About from '../components/About/About';
import Menu from '../components/Menu/Menu';
import Data from '../components/Data/Data';
import Customers from '../components/Customers/Customers';
import Contact from '../components/Contact/Contact';
import './PageStyles.css';

const HomePage = () => {
    return (
        <div className="page-container home-page">
            <Landing />
            <About />
            <Menu />
            <Data />
            <Customers />
            <Contact />
        </div>
    );
};

export default HomePage; 