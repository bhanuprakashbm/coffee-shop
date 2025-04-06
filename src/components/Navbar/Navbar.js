import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMugSaucer,
    faCartShopping,
    faCoffee,
    faCoffeeBean,
    faStore
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const location = useLocation();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <div className="logo-icon">
                    <FontAwesomeIcon icon={faMugSaucer} className="logo-icon-main" />
                    <FontAwesomeIcon icon={faCoffee} className="logo-icon-secondary" />
                </div>
                <div className="logo-text">
                    <span className="logo-text-primary">Coffee</span>
                    <span className="logo-text-secondary">House</span>
                </div>
            </Link>
            <div className="navigation">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>Menu</Link>
                <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
                    <div className="cart-icon-container">
                        <FontAwesomeIcon icon={faCartShopping} />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar; 