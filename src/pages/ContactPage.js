import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import './PageStyles.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formSuccess, setFormSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your server
        setFormSuccess(true);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setTimeout(() => {
            setFormSuccess(false);
        }, 5000);
    };

    const locations = [
        {
            id: 1,
            name: 'Downtown',
            address: '123 Coffee Street, Downtown, City 10001',
            phone: '+1 (555) 123-4567',
            email: 'downtown@coffeeshop.com',
            hours: 'Mon-Fri: 7am-7pm, Sat-Sun: 8am-6pm'
        },
        {
            id: 2,
            name: 'Uptown',
            address: '456 Brew Avenue, Uptown, City 10002',
            phone: '+1 (555) 987-6543',
            email: 'uptown@coffeeshop.com',
            hours: 'Mon-Fri: 6am-8pm, Sat-Sun: 7am-7pm'
        },
        {
            id: 3,
            name: 'Westside',
            address: '789 Espresso Blvd, Westside, City 10003',
            phone: '+1 (555) 456-7890',
            email: 'westside@coffeeshop.com',
            hours: 'Mon-Sun: 7am-9pm'
        }
    ];

    return (
        <div className="page-container contact-page">
            <div className="page-banner">
                <h1>Contact Us</h1>
                <p>Get in touch with our team. We're here to help!</p>
            </div>

            <div className="contact-container">
                <div className="contact-info">
                    <h2>How Can We Help?</h2>
                    <p>
                        We'd love to hear from you! Whether you have a question about our products,
                        services, or just want to say hello, drop us a message and we'll get back to you as soon as possible.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faPhone} />
                            <div>
                                <h3>Phone</h3>
                                <p>+1 (555) 123-4567</p>
                                <p>Mon-Fri, 9am-5pm</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <div>
                                <h3>Email</h3>
                                <p>info@coffeeshop.com</p>
                                <p>support@coffeeshop.com</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <div>
                                <h3>Main Office</h3>
                                <p>123 Coffee Street</p>
                                <p>City, State 10001</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <FontAwesomeIcon icon={faClock} />
                            <div>
                                <h3>Hours</h3>
                                <p>Mon-Fri: 7am-7pm</p>
                                <p>Sat-Sun: 8am-6pm</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <h2>Send Us a Message</h2>

                    {formSuccess && (
                        <div className="form-success">
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you soon!</p>
                        </div>
                    )}

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="contact-submit-btn">
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="locations-section">
                <h2>Our Locations</h2>
                <div className="locations-grid">
                    {locations.map(location => (
                        <div key={location.id} className="location-card">
                            <h3>{location.name} Location</h3>
                            <div className="location-details">
                                <p>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    {location.address}
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faPhone} />
                                    {location.phone}
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    {location.email}
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faClock} />
                                    {location.hours}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactPage; 