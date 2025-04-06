import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

// Import menu images from placeholder
import { images } from '../../assets/placeholderImages';

const Menu = () => {
    return (
        <section className="menu">
            <div className="menu-left">
                <h3 className="main-heading">Discover</h3>
                <h1>Our Menu</h1>
                <p>
                    Experience our carefully crafted selection of premium coffee drinks,
                    pastries, and light meals. We source only the finest coffee beans
                    from sustainable farms around the world and prepare each drink
                    with precision and care. Our skilled baristas are passionate about
                    delivering the perfect cup every time.
                </p>
                <Link to="/menu" className="menu-btn">View Full Menu</Link>
            </div>
            <div className="menu-right">
                <div className="menu-right-images">
                    <div className="menu-img-wrapper">
                        <img
                            src={images.image4}
                            alt="Coffee item 1"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop";
                            }}
                        />
                    </div>
                    <div className="menu-img-wrapper">
                        <img
                            src="https://images.pexels.com/photos/1170656/pexels-photo-1170656.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Coffee item 2"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1000&auto=format&fit=crop";
                            }}
                        />
                    </div>
                    <div className="menu-img-wrapper">
                        <img
                            src={images.image6}
                            alt="Coffee item 3"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop";
                            }}
                        />
                    </div>
                    <div className="menu-img-wrapper">
                        <img
                            src={images.image7}
                            alt="Coffee item 4"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1000&auto=format&fit=crop";
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Menu; 