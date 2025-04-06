// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDfCv4FBhLUvcdcFKC_i7Tp94l6nXTFGyw",
    authDomain: "coffeeshop-85dc2.firebaseapp.com",
    projectId: "coffeeshop-85dc2",
    storageBucket: "coffeeshop-85dc2.firebasestorage.app",
    messagingSenderId: "721050298183",
    appId: "1:721050298183:web:4e81320c08b43e6d978e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Connect to Firestore emulator in development mode
if (window.location.hostname === 'localhost') {
    // If running locally, use the emulator
    try {
        connectFirestoreEmulator(db, 'localhost', 8080);
        console.log('Connected to Firestore emulator');
    } catch (error) {
        console.error('Failed to connect to Firestore emulator:', error);
    }
}

export { db, auth, storage };
export default app; 