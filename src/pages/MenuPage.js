import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faStar, faStarHalfAlt, faFilter, faTimes, faSort, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import menuItems from '../data/menuItems';
import './PageStyles.css';
import { useCart } from '../context/CartContext';

// Helper function to render star ratings
const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} />);
    }

    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} />);
    }

    return <div className="rating">{stars}</div>;
};

// Get unique categories, subcategories, and tags from menu items
const getAllCategories = () => {
    const categories = new Set();
    menuItems.forEach(item => categories.add(item.category));
    return Array.from(categories);
};

const getAllSubcategories = () => {
    const subcategories = new Set();
    menuItems.forEach(item => subcategories.add(item.subcategory));
    return Array.from(subcategories);
};

const getAllTags = () => {
    const tags = new Set();
    menuItems.forEach(item => {
        if (item.tags) {
            item.tags.forEach(tag => tags.add(tag));
        }
    });
    return Array.from(tags);
};

const MenuPage = () => {
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [sortOption, setSortOption] = useState('default');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 600]);
    const [onlyBestsellers, setOnlyBestsellers] = useState(false);
    const [addedItems, setAddedItems] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});

    const categories = getAllCategories();
    const subcategories = getAllSubcategories();
    const tags = getAllTags();

    // Effect to filter items based on search and filter criteria
    useEffect(() => {
        let result = [...menuItems];

        // Apply search term filter
        if (searchTerm) {
            const lowercasedSearch = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(lowercasedSearch) ||
                item.description.toLowerCase().includes(lowercasedSearch)
            );
        }

        // Apply category filter
        if (selectedCategory !== 'all') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Apply subcategory filter
        if (selectedSubcategory !== 'all') {
            result = result.filter(item => item.subcategory === selectedSubcategory);
        }

        // Apply tag filter
        if (selectedTag !== 'all') {
            result = result.filter(item => item.tags && item.tags.includes(selectedTag));
        }

        // Apply price range filter - update for INR prices
        result = result.filter(item =>
            item.price >= priceRange[0] && item.price <= priceRange[1]
        );

        // Apply bestseller filter
        if (onlyBestsellers) {
            result = result.filter(item => item.bestseller);
        }

        // Apply sorting
        switch (sortOption) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default sorting by category and then by name
                result.sort((a, b) => {
                    if (a.category !== b.category) {
                        return a.category.localeCompare(b.category);
                    }
                    return a.name.localeCompare(b.name);
                });
        }

        setFilteredItems(result);
    }, [searchTerm, selectedCategory, selectedSubcategory, selectedTag, sortOption, priceRange, onlyBestsellers]);

    // Reset all filters
    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setSelectedSubcategory('all');
        setSelectedTag('all');
        setSortOption('default');
        setPriceRange([0, 600]);
        setOnlyBestsellers(false);
    };

    const handleAddToCart = (item) => {
        const selectedSize = selectedSizes[item.id] || (item.size ? Object.keys(item.size)[0] : null);

        const itemToAdd = {
            ...item,
            selectedSize,
            // If this item has sizes, use the price of the selected size
            price: selectedSize && item.size ? item.size[selectedSize].price : item.price
        };

        addToCart(itemToAdd);

        // Set visual feedback
        setAddedItems(prev => ({
            ...prev,
            [item.id]: true
        }));

        // Reset after 1.5 seconds
        setTimeout(() => {
            setAddedItems(prev => ({
                ...prev,
                [item.id]: false
            }));
        }, 1500);
    };

    const handleSizeChange = (itemId, size) => {
        setSelectedSizes(prev => ({
            ...prev,
            [itemId]: size
        }));
    };

    return (
        <div className="page-container menu-page">
            <div className="page-banner">
                <h1>Our Menu</h1>
                <p>Discover our wide selection of handcrafted coffee, pastries, and more.</p>
            </div>

            <div className="advanced-menu-container">
                {/* Search and Filter Bar */}
                <div className="menu-search-bar">
                    <div className="search-input">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="Search coffee, pastries, sandwiches..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchTerm('')}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        )}
                    </div>

                    <div className="filter-sort-buttons">
                        <button
                            className={`filter-button ${showFilters ? 'active' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FontAwesomeIcon icon={faFilter} /> Filter
                        </button>

                        <div className="sort-dropdown">
                            <div className="sort-label">
                                <FontAwesomeIcon icon={faSort} /> Sort By
                            </div>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="default">Default</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="filter-panel">
                        <div className="filter-section">
                            <h3>Categories</h3>
                            <div className="filter-options">
                                <button
                                    className={selectedCategory === 'all' ? 'active' : ''}
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    All
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        className={selectedCategory === category ? 'active' : ''}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Subcategories</h3>
                            <div className="filter-options">
                                <button
                                    className={selectedSubcategory === 'all' ? 'active' : ''}
                                    onClick={() => setSelectedSubcategory('all')}
                                >
                                    All
                                </button>
                                {subcategories.map(subcategory => (
                                    <button
                                        key={subcategory}
                                        className={selectedSubcategory === subcategory ? 'active' : ''}
                                        onClick={() => setSelectedSubcategory(subcategory)}
                                    >
                                        {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Tags</h3>
                            <div className="filter-options">
                                <button
                                    className={selectedTag === 'all' ? 'active' : ''}
                                    onClick={() => setSelectedTag('all')}
                                >
                                    All
                                </button>
                                {tags.map(tag => (
                                    <button
                                        key={tag}
                                        className={selectedTag === tag ? 'active' : ''}
                                        onClick={() => setSelectedTag(tag)}
                                    >
                                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Price Range: ₹{priceRange[0].toFixed(0)} - ₹{priceRange[1].toFixed(0)}</h3>
                            <div className="price-slider">
                                <input
                                    type="range"
                                    min="0"
                                    max="600"
                                    step="50"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                                />
                            </div>
                        </div>

                        <div className="filter-section">
                            <label className="bestseller-checkbox">
                                <input
                                    type="checkbox"
                                    checked={onlyBestsellers}
                                    onChange={() => setOnlyBestsellers(!onlyBestsellers)}
                                />
                                Only Bestsellers
                            </label>
                        </div>

                        <button className="reset-filters" onClick={resetFilters}>
                            Reset All Filters
                        </button>
                    </div>
                )}

                {/* Results Info */}
                <div className="results-info">
                    <p>Showing {filteredItems.length} items</p>
                </div>

                {/* Menu Items Grid */}
                {filteredItems.length > 0 ? (
                    <div className="menu-items-grid">
                        {filteredItems.map(item => (
                            <div key={item.id} className="menu-item-card">
                                {item.bestseller && <div className="bestseller-badge">Bestseller</div>}
                                <div className="menu-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="menu-item-details">
                                    <h3>{item.name}</h3>
                                    {renderRating(item.rating)}
                                    <p className="menu-item-description">{item.description}</p>

                                    {item.size && (
                                        <div className="size-selection">
                                            {Object.keys(item.size).map(sizeKey => (
                                                <button
                                                    key={sizeKey}
                                                    className={`size-btn ${selectedSizes[item.id] === sizeKey ? 'selected' : ''}`}
                                                    onClick={() => handleSizeChange(item.id, sizeKey)}
                                                >
                                                    {item.size[sizeKey].label} (₹{item.size[sizeKey].price.toFixed(2)})
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <div className="menu-item-price-cart">
                                        <div className="menu-item-price">
                                            ₹{(selectedSizes[item.id] && item.size
                                                ? item.size[selectedSizes[item.id]].price
                                                : item.price).toFixed(2)}
                                        </div>
                                        <button
                                            className={`add-to-cart-btn ${addedItems[item.id] ? 'added' : ''}`}
                                            onClick={() => handleAddToCart(item)}
                                            disabled={addedItems[item.id]}
                                        >
                                            <span>
                                                {addedItems[item.id]
                                                    ? <><FontAwesomeIcon icon={faCheck} /> Added</>
                                                    : <><FontAwesomeIcon icon={faShoppingCart} /> Add</>
                                                }
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>No items match your search and filter criteria.</p>
                        <button onClick={resetFilters}>Reset Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;