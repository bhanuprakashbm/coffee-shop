import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfCv4FBhLUvcdcFKC_i7Tp94l6nXTFGyw",
    authDomain: "coffeeshop-85dc2.firebaseapp.com",
    projectId: "coffeeshop-85dc2",
    storageBucket: "coffeeshop-85dc2.appspot.com",
    messagingSenderId: "721050298183",
    appId: "1:721050298183:web:4e81320c08b43e6d978e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Local storage for offline operation or in case Firebase fails
let localOrders = JSON.parse(localStorage.getItem('coffeeShopOrders') || '[]');

// Order collection reference
const ordersCollection = collection(db, "orders");

// Connect to Firestore emulator in development mode
if (window.location.hostname === 'localhost') {
    try {
        // Only uncomment this when Firebase emulator is running
        // connectFirestoreEmulator(db, 'localhost', 8080);
        console.log('Connected to Firestore emulator');
    } catch (error) {
        console.error('Failed to connect to Firestore emulator:', error);
    }
}

// Function to save order to Firestore with local fallback
export const saveOrder = async (orderData) => {
    try {
        // Try to save to Firestore
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            createdAt: new Date()
        });

        console.log("Order saved to Firestore with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving order to Firestore: ", error);

        // Fallback to local storage
        const localId = `local-${Date.now()}`;
        const localOrder = {
            id: localId,
            ...orderData,
            createdAt: new Date(),
            isLocal: true // Flag to identify locally stored orders
        };

        localOrders.push(localOrder);
        localStorage.setItem('coffeeShopOrders', JSON.stringify(localOrders));

        console.log("Order saved locally with ID:", localId);
        return localId;
    }
};

// Function to get user orders with local fallback
export const getUserOrders = async (userId) => {
    try {
        // First, try to get orders from Firestore
        const q = query(
            ordersCollection,
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const firestoreOrders = [];

        querySnapshot.forEach((doc) => {
            firestoreOrders.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Get any local orders
        const localUserOrders = localOrders.filter(order => order.userId === userId);

        // Combine and sort by date
        const allOrders = [...firestoreOrders, ...localUserOrders]
            .sort((a, b) => {
                // Convert to timestamps for comparison
                const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
                const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
                return dateB - dateA; // Descending order
            });

        console.log("Retrieved orders:", allOrders.length, "total");
        return allOrders;
    } catch (error) {
        console.error("Error fetching orders from Firestore: ", error);

        // Return only local orders as fallback
        const localUserOrders = localOrders.filter(order => order.userId === userId);
        console.log("Returning only local orders:", localUserOrders.length);
        return localUserOrders;
    }
};

export { db, auth }; 