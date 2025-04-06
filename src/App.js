import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { setFavicon } from './utils/favicon';

function App() {
  // Set custom favicon
  useEffect(() => {
    // Set the dynamic favicon
    setFavicon();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('sticky', window.scrollY > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add a click event listener to the document to ensure events bubble up properly
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Ensure clicks can bubble up to document level for navigation
      if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && !e.target.closest('a') && !e.target.closest('button')) {
        e.stopPropagation();
      }
    };

    document.addEventListener('click', handleDocumentClick, { passive: true });
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <CartProvider>
      <OrderProvider>
        <Router>
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
