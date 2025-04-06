import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { Autoplay, Pagination, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Landing.css';

// Import images from placeholder
import { images } from '../../assets/placeholderImages';

// Install Swiper modules
SwiperCore.use([Autoplay, Pagination, EffectFade]);

const Landing = () => {
    return (
        <section className="landing">
            <div className="top-right-image">
                <img src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Coffee cup" />
            </div>

            <div className="banner">
                <h3 className="main-heading">Welcome</h3>
                <h1>Amazing taste & beautiful place</h1>
                <p>
                    Experience the perfect blend of flavor and ambiance at our coffee house.
                    We pride ourselves on serving exceptional coffee in a warm, inviting
                    atmosphere that makes every visit special.
                </p>
                <Link to="/cart" className="banner-btn banner-btn-1">
                    Order Now
                </Link>
                <Link to="/menu" className="banner-btn banner-btn-2">
                    View Menu
                </Link>
            </div>

            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                loop={true}
                pagination={{
                    clickable: true,
                }}
                className="swiper"
            >
                <SwiperSlide className="swiper-slide" data-caption="Feel at home in our cozy space">
                    <img src={images.image1} alt="Coffee shop interior" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide" data-caption="Discover our delicious menu">
                    <img src={images.image2} alt="Discover our delicious menu" />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide" data-caption="We use only premium coffee beans">
                    <img src={images.image3} alt="Coffee beans" />
                </SwiperSlide>
            </Swiper>

            <div className="landing-contact">
                <div className="details">
                    <FontAwesomeIcon icon={faPhone} />
                    <div>
                        <span>000 (123) 456 7890</span>
                        <span>Call us anytime for reservations or to place your delivery order.</span>
                    </div>
                </div>
                <div className="details">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <div>
                        <span>123 Main Street</span>
                        <span>203 Fake St. Mountain View, San Francisco, California, USA</span>
                    </div>
                </div>
                <div className="details">
                    <FontAwesomeIcon icon={faClock} />
                    <div>
                        <span>Open Monday-Friday</span>
                        <span>Please Join Us, We are Available {'->'} 8:00am - 9:00pm</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing; 