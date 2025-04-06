import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faSpinner,
    faReceipt,
    faClockRotateLeft,
    faCheck,
    faTruck,
    faXmark,
    faCircleInfo
} from '@fortawesome/free-solid-svg-icons';
import { useOrders } from '../../context/OrderContext';
import './OrdersList.css';

const OrdersList = () => {
    const { orders, loading, error, formatDate } = useOrders();
    const [expandedOrder, setExpandedOrder] = useState(null);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FontAwesomeIcon icon={faCheck} className="status-icon completed" />;
            case 'processing':
                return <FontAwesomeIcon icon={faSpinner} className="status-icon processing" />;
            case 'delivered':
                return <FontAwesomeIcon icon={faTruck} className="status-icon delivered" />;
            case 'cancelled':
                return <FontAwesomeIcon icon={faXmark} className="status-icon cancelled" />;
            default:
                return <FontAwesomeIcon icon={faCircleInfo} className="status-icon" />;
        }
    };

    if (loading) {
        return (
            <div className="orders-loading">
                <FontAwesomeIcon icon={faSpinner} spin />
                <p>Loading your orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-error">
                <p>{error}</p>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-empty">
                <div className="orders-empty-icon">
                    <FontAwesomeIcon icon={faReceipt} />
                </div>
                <h3>No orders yet</h3>
                <p>Your order history will appear here</p>
            </div>
        );
    }

    return (
        <div className="orders-list">
            <h2 className="orders-title">
                <FontAwesomeIcon icon={faClockRotateLeft} className="orders-title-icon" />
                Order History
            </h2>

            {orders.map(order => (
                <div key={order.id} className="order-item">
                    <div
                        className="order-summary"
                        onClick={() => toggleOrderDetails(order.id)}
                    >
                        <div className="order-info">
                            <div className="order-date">{formatDate(order.createdAt)}</div>
                            <div className="order-number">Order #{order.id.slice(0, 8)}</div>
                        </div>

                        <div className="order-meta">
                            <div className="order-status">
                                {getStatusIcon(order.status)}
                                <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                            </div>

                            <div className="order-amount">₹{order.total.toFixed(2)}</div>

                            <FontAwesomeIcon
                                icon={expandedOrder === order.id ? faChevronUp : faChevronDown}
                                className="expand-icon"
                            />
                        </div>
                    </div>

                    {expandedOrder === order.id && (
                        <div className="order-details">
                            <div className="order-delivery-details">
                                <h4>Delivery Details</h4>
                                <div className="detail-row">
                                    <span>Address</span>
                                    <span>{order.deliveryAddress}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Time Slot</span>
                                    <span>{order.deliveryTime}</span>
                                </div>
                            </div>

                            <div className="order-items-list">
                                <h4>Items ({order.items.length})</h4>
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item-row">
                                        <div className="item-quantity">{item.quantity}x</div>
                                        <div className="item-name">
                                            {item.name}
                                            {item.selectedSize && item.size && (
                                                <span className="item-size">
                                                    {item.size[item.selectedSize].label}
                                                </span>
                                            )}
                                        </div>
                                        <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-payment-details">
                                <h4>Payment</h4>
                                <div className="detail-row">
                                    <span>Method</span>
                                    <span>{order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Status</span>
                                    <span className={`payment-status ${order.paymentStatus}`}>
                                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="order-summary-details">
                                <h4>Order Summary</h4>
                                <div className="detail-row">
                                    <span>Subtotal</span>
                                    <span>₹{order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Delivery Fee</span>
                                    <span>₹{order.deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Tax</span>
                                    <span>₹{order.tax.toFixed(2)}</span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="detail-row discount">
                                        <span>Discount</span>
                                        <span>-₹{order.discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="detail-row total">
                                    <span>Total</span>
                                    <span>₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrdersList; 