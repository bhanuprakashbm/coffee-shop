import React, { createContext, useState, useContext, useEffect } from 'react';
import { saveOrder, getUserOrders } from '../firebase/firebase';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // In a real app, you would get this from Authentication
    // For demo purposes, we'll use a mock user ID
    const userId = "demo-user-123";

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            // Set a timeout to ensure we don't wait too long
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Fetching orders timed out')), 5000)
            );

            // Try to fetch orders with timeout
            const fetchedOrders = await Promise.race([
                getUserOrders(userId),
                timeoutPromise
            ]);

            setOrders(fetchedOrders);
            console.log("Successfully fetched orders:", fetchedOrders.length);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders. Please try again later.");

            // Try to get orders from local storage as fallback
            try {
                const localOrders = JSON.parse(localStorage.getItem('coffeeShopOrders') || '[]');
                const userLocalOrders = localOrders.filter(order => order.userId === userId);
                if (userLocalOrders.length > 0) {
                    setOrders(userLocalOrders);
                    console.log("Retrieved orders from local storage:", userLocalOrders.length);
                }
            } catch (localErr) {
                console.error("Error retrieving local orders:", localErr);
            }
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async (orderData) => {
        setLoading(true);
        setError(null);

        try {
            const completeOrderData = {
                ...orderData,
                userId,
                status: 'processing',
                paymentStatus: orderData.paymentMethod === 'cash' ? 'pending' : 'completed'
            };

            // Try to save the order
            const orderId = await saveOrder(completeOrderData);

            // Create a complete order object with ID
            const newOrder = {
                id: orderId,
                ...completeOrderData,
                createdAt: orderData.createdAt || new Date()
            };

            // Add to local state
            setOrders(prevOrders => [newOrder, ...prevOrders]);
            console.log("Order placed successfully:", orderId);
            return orderId;
        } catch (err) {
            console.error("Error placing order:", err);
            setError("Failed to place order. Please try again.");

            // Create a local fallback order to show the user
            const localId = `local-${Date.now()}`;
            const fallbackOrder = {
                id: localId,
                ...orderData,
                userId,
                status: 'processing',
                paymentStatus: orderData.paymentMethod === 'cash' ? 'pending' : 'completed',
                createdAt: new Date(),
                isLocal: true
            };

            // Store locally
            try {
                const localOrders = JSON.parse(localStorage.getItem('coffeeShopOrders') || '[]');
                localOrders.push(fallbackOrder);
                localStorage.setItem('coffeeShopOrders', JSON.stringify(localOrders));

                // Add to state
                setOrders(prevOrders => [fallbackOrder, ...prevOrders]);
                console.log("Created local fallback order:", localId);
            } catch (localErr) {
                console.error("Error saving local fallback order:", localErr);
            }

            return localId;
        } finally {
            setLoading(false);
        }
    };

    // Format date for display
    const formatDate = (timestamp) => {
        if (!timestamp) return '';

        const date = timestamp instanceof Date
            ? timestamp
            : timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }).format(date);
    };

    const value = {
        orders,
        loading,
        error,
        placeOrder,
        fetchOrders,
        formatDate
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext; 