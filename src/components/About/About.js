import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMobileScreenButton,
    faTruckFast,
    faMugHot,
    faLeaf,
    faShoppingCart,
    faCoffee
} from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
    return (
        <section className="about">
            <div className="feature-box">
                <div className="feature-icon">
                    <FontAwesomeIcon icon={faShoppingCart} className="icon-main" />
                    <FontAwesomeIcon icon={faMobileScreenButton} className="icon-secondary" />
                </div>
                <h1>Easy to Order</h1>
                <p>
                    Place your coffee order in seconds through our user-friendly app or website.
                    Customize your drink exactly how you like it, save your favorites,
                    and reorder with just one click.
                </p>
            </div>
            <div className="feature-box">
                <div className="feature-icon">
                    <FontAwesomeIcon icon={faTruckFast} className="icon-main" />
                    <FontAwesomeIcon icon={faCoffee} className="icon-secondary" />
                </div>
                <h1>Fastest Delivery</h1>
                <p>
                    Enjoy hot, fresh coffee delivered to your doorstep in 30 minutes or less.
                    Our dedicated delivery team ensures your order arrives quickly
                    and in perfect condition every time.
                </p>
            </div>
            <div className="feature-box">
                <div className="feature-icon">
                    <FontAwesomeIcon icon={faMugHot} className="icon-main" />
                    <FontAwesomeIcon icon={faLeaf} className="icon-secondary" />
                </div>
                <h1>Quality Coffee</h1>
                <p>
                    Savor premium coffee made from ethically sourced beans, roasted to perfection.
                    Our expert baristas craft each beverage with care, ensuring
                    exceptional flavor in every cup.
                </p>
            </div>
        </section>
    );
};

export default About; 