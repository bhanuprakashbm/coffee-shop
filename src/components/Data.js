import React, { useEffect } from 'react';

const Data = () => {
    useEffect(() => {
        const menu = document.querySelector('.menu');
        const nums = document.querySelectorAll('.num');
        let start = false;

        const startCount = (el) => {
            let max = el.dataset.val;
            let count = setInterval(() => {
                el.textContent++;
                if (el.textContent === max) {
                    clearInterval(count);
                }
            }, 2000 / parseInt(max));
        };

        const handleScroll = () => {
            if (window.scrollY >= menu.offsetTop) {
                if (!start) {
                    nums.forEach((num) => {
                        startCount(num);
                    });
                }
                start = true;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="data">
            <div>
                <div className="icon-wrapper">
                    <i className="fa-solid fa-mug-hot"></i>
                    <span className="icon-bg"></span>
                </div>
                <span className="num" data-val="350">0</span>
                <span className="info">Coffee Branches</span>
            </div>
            <div>
                <div className="icon-wrapper">
                    <span className="icon-bg"></span>
                    <i className="fa-solid fa-mug-hot"></i>
                </div>
                <span className="num" data-val="90">0</span>
                <span className="info">Number of Awards</span>
            </div>
            <div>
                <div className="icon-wrapper">
                    <span className="icon-bg"></span>
                    <i className="fa-solid fa-mug-hot"></i>
                </div>
                <span className="num" data-val="2540">0</span>
                <span className="info">Happy Customers</span>
            </div>
            <div>
                <div className="icon-wrapper">
                    <span className="icon-bg"></span>
                    <i className="fa-solid fa-mug-hot"></i>
                </div>
                <span className="num" data-val="750">0</span>
                <span className="info">Staff</span>
            </div>
        </section>
    );
};

export default Data; 