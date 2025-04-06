import React, { useState } from 'react';
import './Contact.css';

// Import background image
import { images } from '../../assets/placeholderImages';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // Reset form fields
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    return (
        <section className="contact">
            <div className="contact-left" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${images.image1})` }}></div>
            <div className="contact-right">
                <form onSubmit={handleSubmit}>
                    <h1>Book a Table</h1>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <textarea
                            placeholder="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className="contact-btn">Appointment</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact; 