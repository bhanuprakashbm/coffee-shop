import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p className="copyright">
                &copy; All Rights Reserved. {new Date().getFullYear()}. Made by Coffee House
            </p>
        </footer>
    );
};

export default Footer; 