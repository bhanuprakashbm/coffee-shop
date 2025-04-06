import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p className="copyright">
                &copy; All Rights Reserved. {currentYear}. Made by Coffee House
            </p>
        </footer>
    );
};

export default Footer; 