import React from 'react';
import './Customers.css';

// Import customer images from placeholder
import { images } from '../../assets/placeholderImages';

const Customers = () => {
    const testimonials = [
        {
            id: 1,
            text: 'The espresso at Coffee House is absolutely outstanding! I\'ve tried coffee shops all over the city, and nothing compares to their rich, perfectly balanced shots. The staff is always friendly and remembers my regular order.',
            image: images.client1,
            name: 'John Smith'
        },
        {
            id: 2,
            text: 'I visit Coffee House every morning before work. Their cold brew is smooth with no bitterness, and their breakfast pastries are always fresh and delicious. The atmosphere is perfect for both working and casual meetings.',
            image: images.client2,
            name: 'Nick Brown'
        },
        {
            id: 3,
            text: 'As a coffee enthusiast, I appreciate their commitment to quality and sustainability. The seasonal specialty drinks are creative and worth trying! My personal favorite is their caramel macchiato with oat milk.',
            image: images.client3,
            name: 'David Jones'
        },
        {
            id: 4,
            text: 'The ambiance is so cozy and welcoming. I love spending Sunday mornings here with a book and their signature latte. Their customer service is exceptional and makes every visit special.',
            image: images.client4,
            name: 'Ann Smith'
        },
        {
            id: 5,
            text: 'I hosted a small business meeting at Coffee House and everyone was impressed. The coffee was excellent, the food was delightful, and the staff was attentive without being intrusive. Highly recommended!',
            image: images.client5,
            name: 'Mary Brown'
        }
    ];

    return (
        <section className="customers">
            <div className="customers-banner">
                <h3 className="main-heading">Testimony</h3>
                <h1>Customers Say</h1>
                <p>
                    Our customers are at the heart of everything we do. We're proud to have
                    built a loyal community who appreciates our dedication to quality coffee
                    and exceptional service. Here's what some of our regular visitors have
                    to say about their experiences at Coffee House.
                </p>
            </div>
            <div className="clients">
                {testimonials.map(testimonial => (
                    <div
                        className={`client ${testimonial.name === 'Ann Smith' ? 'ann-smith-testimonial' : ''}`}
                        key={testimonial.id}
                    >
                        <p>{testimonial.text}</p>
                        <div>
                            <img src={testimonial.image} alt={`${testimonial.name}`} />
                            <span>{testimonial.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Customers; 