import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faLeaf, faUsers, faAward, faHeart } from '@fortawesome/free-solid-svg-icons';
import './PageStyles.css';

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'Manu Bhanu',
            role: 'Founder & CEO',
            image: 'https://cdn.pixabay.com/photo/2017/11/02/14/27/model-2911332_1280.jpg'
        },
        {
            id: 2,
            name: 'Koushik Reddy',
            role: 'Master Barista',
            image: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg'
        },
        {
            id: 3,
            name: 'Rahul Verma',
            role: 'Coffee Sourcer',
            image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_1280.jpg'
        },
        {
            id: 4,
            name: 'Vikram Singh',
            role: 'Head Chef',
            image: 'https://cdn.pixabay.com/photo/2015/01/12/10/45/man-597178_1280.jpg'
        }
    ];

    const values = [
        {
            id: 1,
            title: 'Quality First',
            description: 'We source only the finest coffee beans from sustainable farms around the world.',
            icon: faCoffee
        },
        {
            id: 2,
            title: 'Sustainability',
            description: 'We are committed to environmentally friendly practices throughout our supply chain.',
            icon: faLeaf
        },
        {
            id: 3,
            title: 'Community',
            description: 'We create spaces where people can connect, collaborate, and feel at home.',
            icon: faUsers
        },
        {
            id: 4,
            title: 'Excellence',
            description: 'We strive for excellence in every cup we serve and every customer interaction.',
            icon: faAward
        }
    ];

    return (
        <div className="page-container about-page">
            <div className="page-banner">
                <h1>About Us</h1>
                <p>Discover our story, our values, and the people behind the perfect cup.</p>
            </div>

            <div className="about-container">
                <section className="about-section">
                    <div className="about-image">
                        <img src="https://cdn.pixabay.com/photo/2016/11/29/12/54/cafe-1869656_1280.jpg" alt="Our coffee shop" />
                    </div>
                    <div className="about-content">
                        <h2>Our Story</h2>
                        <p>Founded in 2010, our coffee shop began with a simple mission: to serve exceptional coffee in a warm, welcoming environment. What started as a small corner café has grown into a beloved community hub, but our dedication to quality and service remains unchanged.</p>
                        <p>We carefully select beans from sustainable farms around the world, roast them to perfection, and prepare each cup with expertise and care. Our pastries and food items are made fresh daily using locally sourced ingredients whenever possible.</p>
                        <p>More than just a place to grab coffee, we've created a space where connections are made, ideas are born, and community thrives. Whether you're meeting friends, working remotely, or simply enjoying a moment of solitude, we're honored to be part of your day.</p>
                    </div>
                </section>

                <section className="values-section">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        {values.map(value => (
                            <div key={value.id} className="value-item">
                                <FontAwesomeIcon icon={value.icon} />
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="team-section">
                    <h2>Meet Our Team</h2>
                    <div className="team-grid">
                        {teamMembers.map(member => (
                            <div key={member.id} className="team-member">
                                <img src={member.image} alt={member.name} />
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutPage; 