import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import './Data.css';

const Data = () => {
    const [startCount, setStartCount] = useState(false);
    const sectionRef = useRef(null);

    const counters = [
        { id: 1, target: 350, label: 'Coffee Branches' },
        { id: 2, target: 90, label: 'Number of Awards' },
        { id: 3, target: 2540, label: 'Happy Customers' },
        { id: 4, target: 750, label: 'Staff' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const sectionTop = sectionRef.current.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (sectionTop < windowHeight * 0.75 && !startCount) {
                    setStartCount(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [startCount]);

    return (
        <section className="data" ref={sectionRef}>
            {counters.map((counter, index) => (
                <div key={counter.id}>
                    <div className="icon-wrapper">
                        <FontAwesomeIcon icon={faMugHot} />
                        <span className="icon-bg"></span>
                    </div>
                    <Counter start={startCount} target={counter.target} />
                    <span className="info">{counter.label}</span>
                </div>
            ))}
        </section>
    );
};

const Counter = ({ start, target }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef(null);

    useEffect(() => {
        if (start && count < target) {
            const increment = Math.ceil(target / 100);
            const interval = Math.floor(2000 / (target / increment));

            const timer = setInterval(() => {
                setCount((prevCount) => {
                    const newCount = prevCount + increment;
                    return newCount >= target ? target : newCount;
                });
            }, interval);

            return () => clearInterval(timer);
        }
    }, [start, count, target]);

    return <span className="num" ref={counterRef}>{count}</span>;
};

export default Data; 