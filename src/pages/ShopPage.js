import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faStarHalfAlt, faShoppingCart, faCheckCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import './PageStyles.css';
import { useCart } from '../context/CartContext';

const ShopPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [addedToCartMap, setAddedToCartMap] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const sliderRef = useRef(null);

    const { addToCart } = useCart();

    // Example product data - in a real application, this would likely come from an API
    const products = [
        {
            id: 1,
            name: 'Premium Espresso Blend',
            category: 'beans',
            price: 1245,
            rating: 4.5,
            description: 'A rich and complex espresso blend with notes of chocolate and caramel.',
            image: 'https://images.pexels.com/photos/4344381/pexels-photo-4344381.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 2,
            name: 'Ethiopian Yirgacheffe',
            category: 'beans',
            price: 1410,
            rating: 5,
            description: 'Single-origin beans with bright acidity and floral notes.',
            image: 'https://images.pexels.com/photos/942818/pexels-photo-942818.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 3,
            name: 'Classic Coffee Mug',
            category: 'equipment',
            price: 1079,
            rating: 4,
            description: 'Ceramic mug with our signature logo. Holds 12 oz.',
            image: 'https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 4,
            name: 'Chemex Pour-Over',
            category: 'equipment',
            price: 3569,
            rating: 4.5,
            description: 'Elegant pour-over coffeemaker for brewing the perfect cup.',
            image: 'https://images.pexels.com/photos/6347553/pexels-photo-6347553.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: false
        },
        {
            id: 5,
            name: 'Cold Brew Kit',
            category: 'equipment',
            price: 2489,
            rating: 4,
            description: 'Complete kit for making smooth, delicious cold brew at home.',
            image: 'https://images.pexels.com/photos/2132639/pexels-photo-2132639.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 6,
            name: 'Coffee Subscription Box',
            category: 'subscriptions',
            price: 2075,
            rating: 5,
            description: 'Monthly delivery of our premium roasts. Price per month.',
            image: 'https://images.pexels.com/photos/1170659/pexels-photo-1170659.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 7,
            name: 'Organic Colombian Medium Roast',
            category: 'beans',
            price: 1329,
            rating: 4,
            description: 'Balanced medium roast with notes of caramel and citrus.',
            image: 'https://images.pexels.com/photos/2074120/pexels-photo-2074120.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 8,
            name: 'Coffee Grinder',
            category: 'equipment',
            price: 4979,
            rating: 4.5,
            description: 'Burr grinder for consistent, customizable coffee grounds.',
            image: 'https://images.pexels.com/photos/6957215/pexels-photo-6957215.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 9,
            name: 'Espresso Shot',
            category: 'drinks',
            price: 289,
            rating: 4.8,
            description: 'Rich, concentrated coffee served in a small cup with crema on top.',
            image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 10,
            name: 'Iced Coffee',
            category: 'drinks',
            price: 355,
            rating: 4.5,
            description: 'Chilled coffee served over ice with optional cream and sweetener.',
            image: 'https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 11,
            name: 'Fruit Smoothie',
            category: 'drinks',
            price: 499,
            rating: 4.7,
            description: 'Refreshing blend of seasonal fruits with yogurt and honey.',
            image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 12,
            name: 'Cold Brew',
            category: 'drinks',
            price: 415,
            rating: 4.8,
            description: 'Smooth, low-acidity coffee brewed with cold water for 12+ hours.',
            image: 'https://images.pexels.com/photos/1727123/pexels-photo-1727123.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 13,
            name: 'Iced Tea',
            category: 'drinks',
            price: 315,
            rating: 4.3,
            description: 'House-brewed black tea served chilled over ice with lemon.',
            image: 'https://images.pexels.com/photos/792613/pexels-photo-792613.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 14,
            name: 'Apple Pie',
            category: 'food',
            price: 415,
            rating: 4.6,
            description: 'Freshly baked pie with cinnamon-spiced apples in a flaky crust.',
            image: 'https://images.pexels.com/photos/6163263/pexels-photo-6163263.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 15,
            name: 'Blueberry Scone',
            category: 'food',
            price: 289,
            rating: 4.5,
            description: 'Buttery scone with fresh blueberries and a lemon glaze.',
            image: 'https://images.pexels.com/photos/5386673/pexels-photo-5386673.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 16,
            name: 'Quiche Lorraine',
            category: 'food',
            price: 579,
            rating: 4.7,
            description: 'Savory tart with bacon, Swiss cheese, and eggs in a flaky crust.',
            image: 'https://images.pexels.com/photos/6939143/pexels-photo-6939143.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 17,
            name: 'Chocolate Muffin',
            category: 'food',
            price: 275,
            rating: 4.7,
            description: 'Rich chocolate muffin with chocolate chips throughout.',
            image: 'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 18,
            name: 'Chicken Panini',
            category: 'food',
            price: 745,
            rating: 4.7,
            description: 'Grilled sandwich with chicken, pesto, and mozzarella on ciabatta.',
            image: 'https://images.pexels.com/photos/4811651/pexels-photo-4811651.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 19,
            name: 'Avocado Toast',
            category: 'food',
            price: 665,
            rating: 4.6,
            description: 'Whole grain toast topped with avocado, sea salt, and red pepper flakes.',
            image: 'https://images.pexels.com/photos/1824353/pexels-photo-1824353.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 20,
            name: 'Earl Grey Tea',
            category: 'drinks',
            price: 289,
            rating: 4.6,
            description: 'Black tea flavored with oil of bergamot, served hot.',
            image: 'https://images.pexels.com/photos/227908/pexels-photo-227908.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 21,
            name: 'Chai Latte',
            category: 'drinks',
            price: 399,
            rating: 4.6,
            description: 'Spiced black tea with steamed milk and honey.',
            image: 'https://images.pexels.com/photos/5946643/pexels-photo-5946643.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 22,
            name: 'Veggie Wrap',
            category: 'food',
            price: 625,
            rating: 4.5,
            description: 'Hummus, mixed greens, roasted vegetables, and feta in a spinach wrap.',
            image: 'https://images.pexels.com/photos/5945760/pexels-photo-5945760.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 23,
            name: 'Herbal Infusion',
            category: 'drinks',
            price: 315,
            rating: 4.4,
            description: 'Soothing blend of chamomile, lavender, and mint herbs.',
            image: 'https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        },
        {
            id: 24,
            name: 'Green Tea',
            category: 'drinks',
            price: 275,
            rating: 4.3,
            description: 'Traditional Japanese green tea with a light, refreshing flavor.',
            image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1280',
            inStock: true
        }
    ];

    // Handle adding a product to the cart
    const handleAddToCart = (product) => {
        if (!product.inStock) return;

        // Add the product to the cart
        addToCart(product);

        // Show the added to cart indicator
        setAddedToCartMap(prev => ({
            ...prev,
            [product.id]: true
        }));

        // Reset the indicator after 2 seconds
        setTimeout(() => {
            setAddedToCartMap(prev => ({
                ...prev,
                [product.id]: false
            }));
        }, 2000);
    };

    // Slider navigation functions
    const scrollLeft = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    // Filter products based on category and search term
    useEffect(() => {
        let filtered = products;

        // Apply category filter
        if (activeCategory !== 'all') {
            filtered = filtered.filter(product => product.category === activeCategory);
        }

        // Apply search filter
        if (searchTerm.trim() !== '') {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
            );
        }

        setFilteredProducts(filtered);
    }, [activeCategory, searchTerm]);

    // Set featured products once on component mount
    useEffect(() => {
        // Use specific product IDs for featured products instead of random selection
        const featuredProductIds = [11, 21, 12, 3, 8]; // Fruit Smoothie, Chai Latte, Cold Brew, Classic Coffee Mug, Coffee Grinder
        const featured = featuredProductIds.map(id => products.find(p => p.id === id)).filter(Boolean);
        setFeaturedProducts(featured);
    }, []);

    // Helper function to render star ratings
    const renderRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
            } else if (i - 0.5 <= rating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={farStar} />);
            }
        }
        return (
            <span className="product-rating">
                {stars} <span>({rating})</span>
            </span>
        );
    };

    return (
        <div className="page-container shop-page">
            <div className="page-banner">
                <h1>Coffee Shop</h1>
                <p>Quality coffee, delicious food, and premium accessories for the perfect café experience.</p>
            </div>

            <div className="featured-products">
                <div className="section-header">
                    <h2>Featured Products</h2>
                    <div className="slider-controls">
                        <button className="slider-button prev" onClick={scrollLeft}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className="slider-button next" onClick={scrollRight}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>

                <div className="featured-slider" ref={sliderRef}>
                    {featuredProducts.map(product => (
                        <div key={product.id} className="product-card featured-product">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                                <div className="category-badge">{product.category}</div>
                                {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
                            </div>
                            <div className="product-details">
                                <h3>{product.name}</h3>
                                {renderRating(product.rating)}
                                <p>{product.description}</p>
                                <div className="product-price-cart">
                                    <div className="product-price">₹{product.price.toFixed(2)}</div>
                                    <button
                                        className={`add-to-cart-btn ${addedToCartMap[product.id] ? 'added' : ''}`}
                                        disabled={!product.inStock}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent event from bubbling up
                                            handleAddToCart(product);
                                        }}
                                    >
                                        <span>
                                            {addedToCartMap[product.id] ? (
                                                <>
                                                    <FontAwesomeIcon icon={faCheckCircle} /> Added
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="shop-container">
                <div className="shop-sidebar">
                    <div className="shop-search">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="shop-filters">
                        <h3>Categories</h3>
                        <ul>
                            <li>
                                <button
                                    className={activeCategory === 'all' ? 'active' : ''}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event from bubbling up
                                        setActiveCategory('all');
                                    }}
                                >
                                    All Products
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeCategory === 'beans' ? 'active' : ''}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event from bubbling up
                                        setActiveCategory('beans');
                                    }}
                                >
                                    Coffee Beans
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeCategory === 'equipment' ? 'active' : ''}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event from bubbling up
                                        setActiveCategory('equipment');
                                    }}
                                >
                                    Equipment
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeCategory === 'drinks' ? 'active' : ''}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event from bubbling up
                                        setActiveCategory('drinks');
                                    }}
                                >
                                    Drinks
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeCategory === 'food' ? 'active' : ''}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event from bubbling up
                                        setActiveCategory('food');
                                    }}
                                >
                                    Food
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeCategory === 'subscriptions' ? 'active' : ''}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event from bubbling up
                                        setActiveCategory('subscriptions');
                                    }}
                                >
                                    Subscriptions
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                                <div className="category-badge">{product.category}</div>
                                {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
                            </div>
                            <div className="product-details">
                                <h3>{product.name}</h3>
                                {renderRating(product.rating)}
                                <p>{product.description}</p>
                                <div className="product-price-cart">
                                    <div className="product-price">₹{product.price.toFixed(2)}</div>
                                    <button
                                        className={`add-to-cart-btn ${addedToCartMap[product.id] ? 'added' : ''}`}
                                        disabled={!product.inStock}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent event from bubbling up
                                            handleAddToCart(product);
                                        }}
                                    >
                                        <span>
                                            {addedToCartMap[product.id] ? (
                                                <>
                                                    <FontAwesomeIcon icon={faCheckCircle} /> Added
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopPage; 