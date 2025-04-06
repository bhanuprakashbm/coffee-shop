import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingCart,
    faTimes,
    faMinus,
    faPlus,
    faMapMarkerAlt,
    faClock,
    faPercent,
    faMotorcycle,
    faTag,
    faCreditCard,
    faMoneyBill,
    faArrowLeft,
    faChevronRight,
    faCheckCircle,
    faSpinner,
    faCheck,
    faListUl
} from '@fortawesome/free-solid-svg-icons';
import './FoodCartStyles.css';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import OrdersList from '../components/Orders/OrdersList';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { placeOrder } = useOrders();

    const [selectedAddress, setSelectedAddress] = useState('Home');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('ASAP');
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [cartTotals, setCartTotals] = useState({
        subtotal: 0,
        tax: 0,
        discount: 0,
        deliveryFee: 49,
        total: 0
    });
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [paymentStep, setPaymentStep] = useState('payment'); // payment, processing, success
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });
    const [processingProgress, setProcessingProgress] = useState(0);
    const [showOrdersSection, setShowOrdersSection] = useState(false);
    const [orderProcessing, setOrderProcessing] = useState(false);

    const addresses = [
        { id: 1, name: 'Home', address: '123 Coffee Street, Downtown, City 10001', default: true },
        { id: 2, name: 'Work', address: '456 Office Building, Business District, City 10002', default: false },
    ];

    const timeSlots = [
        { id: 1, name: 'ASAP (25-30 min)', value: 'ASAP' },
        { id: 2, name: 'Today, 6:00 PM - 6:30 PM', value: '6:00 PM' },
        { id: 3, name: 'Today, 7:00 PM - 7:30 PM', value: '7:00 PM' },
        { id: 4, name: 'Tomorrow, 10:00 AM - 10:30 AM', value: '10:00 AM' }
    ];

    const availableCoupons = [
        { code: 'WELCOME20', discount: 20, type: 'percent', maxDiscount: 200, minOrder: 800 },
        { code: 'FREESHIP', discount: 49, type: 'flat', maxDiscount: 49, minOrder: 1000 },
        { code: 'COFFEE10', discount: 10, type: 'percent', maxDiscount: 150, minOrder: 500 }
    ];

    const calculateTotals = useCallback(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05; // 5% GST
        const deliveryFee = 49; // Delivery fee in INR

        // Calculate discount if coupon is applied
        let discount = 0;
        if (appliedCoupon) {
            if (subtotal >= appliedCoupon.minOrder) {
                if (appliedCoupon.type === 'percent') {
                    discount = Math.min((subtotal * appliedCoupon.discount / 100), appliedCoupon.maxDiscount);
                } else {
                    discount = appliedCoupon.discount;
                }
            } else {
                setAppliedCoupon(null);
            }
        }

        const total = subtotal + tax + deliveryFee - discount;

        setCartTotals({
            subtotal,
            tax,
            discount,
            deliveryFee,
            total
        });
    }, [cartItems, appliedCoupon]);

    useEffect(() => {
        calculateTotals();
    }, [calculateTotals]);

    const applyCoupon = (code) => {
        const coupon = availableCoupons.find(c => c.code === code);
        if (coupon) {
            setAppliedCoupon(coupon);
            setCouponCode('');
            setShowCouponModal(false);
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
    };

    const handleCheckout = () => {
        setShowCheckoutModal(true);
    };

    const processPayment = () => {
        // If payment method is cash on delivery, skip payment processing simulation
        if (selectedPayment === 'cash') {
            // Still show processing state for consistency
            setPaymentStep('processing');

            // Start progress for COD orders
            let progress = 0;
            const interval = setInterval(() => {
                progress += 20; // Faster progress for COD
                setProcessingProgress(progress);

                if (progress >= 100) {
                    clearInterval(interval);
                    // Save order to Firebase
                    saveOrderToFirebase();
                }
            }, 250); // Slightly faster for COD
            return;
        }

        // For card payments, show processing state
        setPaymentStep('processing');

        // Simulate payment processing with progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setProcessingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                // Save order to Firebase
                saveOrderToFirebase();
            }
        }, 300);
    };

    const saveOrderToFirebase = async () => {
        try {
            setOrderProcessing(true);

            // Prepare order data
            const orderData = {
                items: cartItems,
                subtotal: cartTotals.subtotal,
                tax: cartTotals.tax,
                deliveryFee: cartTotals.deliveryFee,
                discount: cartTotals.discount,
                total: cartTotals.total,
                paymentMethod: selectedPayment,
                paymentStatus: selectedPayment === 'cash' ? 'pending' : 'completed',
                status: 'processing',
                deliveryAddress: addresses.find(a => a.name === selectedAddress)?.address || '',
                deliveryTime: timeSlots.find(t => t.value === selectedTimeSlot)?.name || '',
                appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
                userId: "demo-user-123", // In a real app, get this from auth
                createdAt: new Date() // Add timestamp here too for consistency
            };

            // Set a timeout to ensure we don't wait too long
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Order processing timed out')), 5000)
            );

            // Try to save to Firebase with a timeout
            const orderId = await Promise.race([
                placeOrder(orderData),
                timeoutPromise
            ]);

            console.log("Order saved successfully with ID:", orderId);

            // Move to success state
            setTimeout(() => {
                setPaymentStep('success');
                setOrderProcessing(false);
            }, 500);
        } catch (error) {
            console.error("Error saving order:", error);

            // Handle error - but still show success for demo purposes
            setOrderProcessing(false);

            // Force move to success after a short delay
            setTimeout(() => {
                setPaymentStep('success');
            }, 500);
        }
    };

    const completeOrder = () => {
        // Close modal, clear cart, and reset states
        setShowCheckoutModal(false);
        setPaymentStep('payment');
        setProcessingProgress(0);
        clearCart();

        // Show orders section after completing an order
        setShowOrdersSection(true);
    };

    const handleCardInput = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (cartItems.length === 0) {
        return (
            <div className="page-container food-cart-page">
                {showOrdersSection ? (
                    <div className="food-cart-with-orders">
                        <div className="food-cart-header">
                            <h1>Your Orders</h1>
                            <button
                                className="food-cart-toggle-btn"
                                onClick={() => setShowOrdersSection(false)}
                            >
                                <span><FontAwesomeIcon icon={faShoppingCart} /> View Cart</span>
                            </button>
                        </div>
                        <OrdersList />
                    </div>
                ) : (
                    <div>
                        <div className="food-cart-header">
                            <Link to="/shop" className="back-button">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Link>
                            <h1>Your Cart</h1>
                            <button
                                className="food-cart-toggle-btn"
                                onClick={() => setShowOrdersSection(true)}
                            >
                                <span><FontAwesomeIcon icon={faListUl} /> View Orders</span>
                            </button>
                        </div>
                        <div className="food-cart-empty">
                            <div className="food-cart-empty-icon">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </div>
                            <h2>Your cart is empty</h2>
                            <p>Looks like you haven't added any items to your cart yet.</p>
                            <Link to="/shop" className="food-cart-btn">
                                <span>Browse Shop</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="page-container food-cart-page">
            <div className="food-cart-header">
                <Link to="/shop" className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <h1>Your Order</h1>
                <button
                    className="food-cart-toggle-btn"
                    onClick={() => setShowOrdersSection(true)}
                >
                    <span><FontAwesomeIcon icon={faListUl} /> View Orders</span>
                </button>
            </div>

            {showOrdersSection ? (
                <OrdersList />
            ) : (
                <div className="food-cart-container">
                    <div className="food-cart-left">
                        {/* Delivery Details Section */}
                        <div className="food-cart-section">
                            <div className="section-header">
                                <h2>Delivery Details</h2>
                            </div>

                            <div className="delivery-option" onClick={() => setShowAddressModal(true)}>
                                <div className="delivery-option-icon">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </div>
                                <div className="delivery-option-content">
                                    <h3>Deliver to</h3>
                                    <p>{addresses.find(a => a.name === selectedAddress)?.address}</p>
                                </div>
                                <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
                            </div>

                            <div className="delivery-option" onClick={() => setShowTimeSlotModal(true)}>
                                <div className="delivery-option-icon">
                                    <FontAwesomeIcon icon={faClock} />
                                </div>
                                <div className="delivery-option-content">
                                    <h3>Delivery Time</h3>
                                    <p>{timeSlots.find(t => t.value === selectedTimeSlot)?.name}</p>
                                </div>
                                <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
                            </div>
                        </div>

                        {/* Order Items Section */}
                        <div className="food-cart-section">
                            <div className="section-header">
                                <h2>Your Cart ({cartItems.length})</h2>
                            </div>

                            <div className="cart-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="cart-item-details">
                                            <div className="cart-item-name-remove">
                                                <h3>{item.name}</h3>
                                                <button
                                                    className="remove-item-btn"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>

                                            {item.selectedSize && item.size && (
                                                <div className="cart-item-size">
                                                    Size: {item.size[item.selectedSize].label}
                                                </div>
                                            )}

                                            {item.customizations && item.customizations.length > 0 && (
                                                <div className="cart-item-customizations">
                                                    {item.customizations.map((option, index) => (
                                                        <span key={index}>{option}</span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="cart-item-price-qty">
                                                <div className="item-price">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </div>
                                                <div className="item-quantity">
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="food-cart-section">
                            <div className="section-header">
                                <h2>Offers & Benefits</h2>
                            </div>

                            {appliedCoupon ? (
                                <div className="applied-coupon">
                                    <div className="coupon-icon">
                                        <FontAwesomeIcon icon={faTag} />
                                    </div>
                                    <div className="coupon-details">
                                        <h3>{appliedCoupon.code}</h3>
                                        <p>
                                            {appliedCoupon.type === 'percent'
                                                ? `${appliedCoupon.discount}% off up to ₹${appliedCoupon.maxDiscount}`
                                                : `₹${appliedCoupon.discount} off`}
                                        </p>
                                    </div>
                                    <button className="remove-coupon-btn" onClick={removeCoupon}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            ) : (
                                <div className="coupon-option" onClick={() => setShowCouponModal(true)}>
                                    <div className="coupon-option-icon">
                                        <FontAwesomeIcon icon={faPercent} />
                                    </div>
                                    <div className="coupon-option-content">
                                        <h3>Apply Coupon</h3>
                                        <p>Save on your order</p>
                                    </div>
                                    <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="food-cart-right">
                        {/* Payment Method Section */}
                        <div className="food-cart-section payment-section">
                            <div className="section-header">
                                <h2>Payment Method</h2>
                            </div>

                            <div className="payment-options">
                                <div
                                    className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
                                    onClick={() => setSelectedPayment('card')}
                                >
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    <span>Credit/Debit Card</span>
                                    {selectedPayment === 'card' && (
                                        <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
                                    )}
                                </div>

                                <div
                                    className={`payment-option ${selectedPayment === 'cash' ? 'selected' : ''}`}
                                    onClick={() => setSelectedPayment('cash')}
                                >
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                    <span>Cash on Delivery</span>
                                    {selectedPayment === 'cash' && (
                                        <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Section */}
                        <div className="food-cart-section order-summary-section">
                            <div className="section-header">
                                <h2>Order Summary</h2>
                            </div>

                            <div className="summary-row">
                                <span>Item Total</span>
                                <span>₹{cartTotals.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery Fee</span>
                                <span>₹{cartTotals.deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Taxes</span>
                                <span>₹{cartTotals.tax.toFixed(2)}</span>
                            </div>

                            {cartTotals.discount > 0 && (
                                <div className="summary-row discount">
                                    <span>Discount</span>
                                    <span>-₹{cartTotals.discount.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{cartTotals.total.toFixed(2)}</span>
                            </div>

                            <div className="delivery-time-estimate">
                                <FontAwesomeIcon icon={faMotorcycle} />
                                <span>Estimated delivery time: 25-35 mins</span>
                            </div>

                            <button className="food-cart-checkout-btn" onClick={handleCheckout}>
                                <span>Proceed to Checkout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Address Modal */}
            {showAddressModal && (
                <div className="food-cart-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Select Delivery Address</h2>
                            <button className="modal-close" onClick={() => setShowAddressModal(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {addresses.map(address => (
                                <div
                                    key={address.id}
                                    className={`address-option ${selectedAddress === address.name ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedAddress(address.name);
                                        setShowAddressModal(false);
                                    }}
                                >
                                    <div className="address-icon">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    </div>
                                    <div className="address-details">
                                        <h3>{address.name}</h3>
                                        <p>{address.address}</p>
                                    </div>
                                    {address.default && <span className="default-badge">Default</span>}
                                </div>
                            ))}
                            <button className="add-address-btn">
                                <span>+ Add New Address</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Time Slot Modal */}
            {showTimeSlotModal && (
                <div className="food-cart-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Select Delivery Time</h2>
                            <button className="modal-close" onClick={() => setShowTimeSlotModal(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {timeSlots.map(slot => (
                                <div
                                    key={slot.id}
                                    className={`time-slot-option ${selectedTimeSlot === slot.value ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedTimeSlot(slot.value);
                                        setShowTimeSlotModal(false);
                                    }}
                                >
                                    <div className="time-slot-icon">
                                        <FontAwesomeIcon icon={faClock} />
                                    </div>
                                    <div className="time-slot-details">
                                        <span>{slot.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Coupon Modal */}
            {showCouponModal && (
                <div className="food-cart-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Apply Coupon</h2>
                            <button className="modal-close" onClick={() => setShowCouponModal(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="coupon-search">
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button
                                    className="apply-coupon-btn"
                                    onClick={() => applyCoupon(couponCode)}
                                    disabled={!couponCode}
                                >
                                    Apply
                                </button>
                            </div>

                            <div className="available-coupons">
                                <h3>Available Coupons</h3>
                                {availableCoupons.map((coupon, index) => (
                                    <div key={index} className="coupon-card">
                                        <div className="coupon-code">{coupon.code}</div>
                                        <div className="coupon-info">
                                            <div className="coupon-description">
                                                {coupon.type === 'percent'
                                                    ? `${coupon.discount}% off up to ₹${coupon.maxDiscount}`
                                                    : `₹${coupon.discount} off`}
                                            </div>
                                            <div className="coupon-min-order">
                                                Min. Order: ₹{coupon.minOrder}
                                            </div>
                                        </div>
                                        <button
                                            className="coupon-apply-btn"
                                            onClick={() => applyCoupon(coupon.code)}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Checkout Modal */}
            {showCheckoutModal && (
                <div className="food-cart-modal">
                    <div className="modal-content checkout-modal">
                        <div className="modal-header">
                            <h2>
                                {paymentStep === 'payment' && 'Payment Details'}
                                {paymentStep === 'processing' && 'Processing Payment'}
                                {paymentStep === 'success' && 'Payment Successful'}
                            </h2>
                            {paymentStep === 'payment' && (
                                <button className="modal-close" onClick={() => setShowCheckoutModal(false)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            )}
                        </div>
                        <div className="modal-body">
                            {paymentStep === 'payment' && (
                                <div className="payment-form">
                                    <div className="selected-payment-method">
                                        <div className="payment-method-header">
                                            <FontAwesomeIcon icon={selectedPayment === 'card' ? faCreditCard : faMoneyBill} />
                                            <h3>{selectedPayment === 'card' ? 'Credit/Debit Card Payment' : 'Cash on Delivery'}</h3>
                                        </div>

                                        {selectedPayment === 'card' ? (
                                            <div className="card-payment-form">
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Card Number</label>
                                                        <input
                                                            type="text"
                                                            placeholder="1234 5678 9012 3456"
                                                            name="cardNumber"
                                                            value={cardDetails.cardNumber}
                                                            onChange={handleCardInput}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Cardholder Name</label>
                                                        <input
                                                            type="text"
                                                            placeholder="John Doe"
                                                            name="cardName"
                                                            value={cardDetails.cardName}
                                                            onChange={handleCardInput}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row two-columns">
                                                    <div className="form-group">
                                                        <label>Expiry Date</label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            name="expiry"
                                                            value={cardDetails.expiry}
                                                            onChange={handleCardInput}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>CVV</label>
                                                        <input
                                                            type="text"
                                                            placeholder="123"
                                                            name="cvv"
                                                            value={cardDetails.cvv}
                                                            onChange={handleCardInput}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="cod-info">
                                                <p>You will pay the delivery person at the time of delivery.</p>
                                                <p>Please ensure you have the exact change if possible.</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="order-summary-compact">
                                        <h3>Order Summary</h3>
                                        <div className="summary-compact-row">
                                            <span>Items ({cartItems.length})</span>
                                            <span>₹{cartTotals.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="summary-compact-row">
                                            <span>Delivery Fee</span>
                                            <span>₹{cartTotals.deliveryFee.toFixed(2)}</span>
                                        </div>
                                        <div className="summary-compact-row">
                                            <span>Taxes</span>
                                            <span>₹{cartTotals.tax.toFixed(2)}</span>
                                        </div>
                                        {cartTotals.discount > 0 && (
                                            <div className="summary-compact-row discount">
                                                <span>Discount</span>
                                                <span>-₹{cartTotals.discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="summary-compact-row total">
                                            <span>Total</span>
                                            <span>₹{cartTotals.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="confirm-payment">
                                        <button
                                            className="confirm-payment-btn"
                                            onClick={processPayment}
                                        >
                                            {selectedPayment === 'cash'
                                                ? 'Place Order'
                                                : `Pay ₹${cartTotals.total.toFixed(2)}`}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {paymentStep === 'processing' && (
                                <div className="payment-processing">
                                    <div className="processing-spinner">
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                    </div>
                                    <h3>
                                        {selectedPayment === 'cash'
                                            ? 'Processing Your Order'
                                            : 'Processing Your Payment'}
                                    </h3>
                                    <p>
                                        {selectedPayment === 'cash'
                                            ? 'Please wait while we confirm your order...'
                                            : 'Please wait while we process your payment...'}
                                    </p>
                                    <div className="processing-progress-container">
                                        <div
                                            className="processing-progress-bar"
                                            style={{ width: `${processingProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="processing-steps">
                                        {selectedPayment === 'cash' ? (
                                            <>
                                                {processingProgress < 30 && "Creating your order..."}
                                                {processingProgress >= 30 && processingProgress < 60 && "Confirming delivery details..."}
                                                {processingProgress >= 60 && processingProgress < 90 && "Preparing your items..."}
                                                {processingProgress >= 90 && "Finalizing your order..."}
                                            </>
                                        ) : (
                                            <>
                                                {processingProgress < 30 && "Verifying payment details..."}
                                                {processingProgress >= 30 && processingProgress < 60 && "Connecting to payment gateway..."}
                                                {processingProgress >= 60 && processingProgress < 90 && "Processing transaction..."}
                                                {processingProgress >= 90 && "Completing your order..."}
                                            </>
                                        )}
                                    </p>
                                </div>
                            )}

                            {paymentStep === 'success' && (
                                <div className="payment-success">
                                    <div className="success-icon">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </div>
                                    <h3>
                                        {selectedPayment === 'cash'
                                            ? 'Order Placed Successfully!'
                                            : 'Payment Successful!'}
                                    </h3>
                                    <p>Your order has been placed successfully.</p>
                                    <div className="order-details">
                                        <div className="order-detail-row">
                                            <span>Order Number:</span>
                                            <span>#{Math.floor(100000 + Math.random() * 900000)}</span>
                                        </div>
                                        <div className="order-detail-row">
                                            <span>Estimated Delivery:</span>
                                            <span>
                                                {selectedTimeSlot === 'ASAP' ?
                                                    '25-35 minutes' :
                                                    timeSlots.find(t => t.value === selectedTimeSlot)?.name
                                                }
                                            </span>
                                        </div>
                                        <div className="order-detail-row">
                                            <span>Delivery Address:</span>
                                            <span>{addresses.find(a => a.name === selectedAddress)?.address}</span>
                                        </div>
                                        <div className="order-detail-row">
                                            <span>Payment Method:</span>
                                            <span>{selectedPayment === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="complete-order-btn"
                                        onClick={completeOrder}
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage; 