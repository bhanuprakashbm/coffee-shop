import React from 'react';

const Contact = () => {
    return (
        <section className="contact">
            <div className="contact-left"></div>
            <div className="contact-right">
                <form>
                    <h1>Book a Table</h1>
                    <div className="input-group">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder="Email Address" />
                        <input type="text" placeholder="Phone" />
                    </div>
                    <div className="input-group">
                        <textarea placeholder="Message"></textarea>
                        <button type="button" className="contact-btn">Appointment</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact; 