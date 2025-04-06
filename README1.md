# Coffee Shop Backend Implementation Report

## 1. Backend Technologies

### 1.1 Primary Technologies
- **JavaScript (Node.js)**: Core backend language
- **Firebase**: Cloud-based backend service
  - Firestore: NoSQL database for storing orders
  - Firebase Authentication: User authentication service (currently using demo user)

### 1.2 Database Management System
- **Firestore**: NoSQL document database
  - Collections-based structure
  - Real-time data synchronization
  - Offline data persistence
  - Cloud-based scalability

## 2. Backend Files Structure

```
src/
├── firebase/
│   └── firebase.js       # Firebase configuration and database functions
├── context/
│   └── OrderContext.js   # Context for managing orders throughout the app
├── data/
│   └── menuItems.js      # Static data for menu items
└── utils/
    └── ...               # Utility functions
```

## 3. Database Implementation

### 3.1 Firebase Configuration (`firebase.js`)

This file handles the initialization and configuration of Firebase services:

```javascript
// Firebase configuration
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
```

### 3.2 Database Operations

#### 3.2.1 Saving Orders to Firestore

```javascript
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
```

#### 3.2.2 Retrieving Orders from Firestore

```javascript
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

        return allOrders;
    } catch (error) {
        // Return only local orders as fallback
        const localUserOrders = localOrders.filter(order => order.userId === userId);
        return localUserOrders;
    }
};
```

## 4. Data Management with Context API

### 4.1 Order Management Context (`OrderContext.js`)

The application uses React's Context API to manage order-related state and operations:

```javascript
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // In a real app, this would come from Authentication
    const userId = "demo-user-123";

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedOrders = await getUserOrders(userId);
            setOrders(fetchedOrders);
        } catch (err) {
            setError("Failed to load orders. Please try again later.");
            // Try local storage fallback
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async (orderData) => {
        // Implementation for placing a new order
        // Saves to Firestore with local storage fallback
    };

    // Format date for display
    const formatDate = (timestamp) => {
        // Date formatting logic
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
```

## 5. Data Models

### 5.1 Order Model

```javascript
{
    id: string,                    // Unique order identifier
    userId: string,                // User who placed the order
    items: Array<{                 // Items in the order
        id: string,                // Item identifier
        name: string,              // Item name
        price: number,             // Item price
        quantity: number,          // Quantity ordered
        size: string,              // Size selected (if applicable)
        customizations: string[]   // Any customizations
    }>,
    subtotal: number,              // Subtotal price
    tax: number,                   // Tax amount
    deliveryFee: number,           // Delivery fee
    total: number,                 // Total amount
    paymentMethod: string,         // Payment method used
    status: string,                // Order status (processing, completed, etc.)
    paymentStatus: string,         // Payment status (pending, completed)
    createdAt: Timestamp,          // When the order was created
    isLocal: boolean               // Whether stored locally or in Firestore
}
```

### 5.2 Menu Item Model (from `menuItems.js`)

```javascript
{
    id: string,                    // Unique identifier
    name: string,                  // Item name
    description: string,           // Item description
    price: number,                 // Base price
    category: string,              // Primary category
    subcategory: string,           // Subcategory
    image: string,                 // Image URL
    tags: string[],                // Tags (vegan, gluten-free, etc.)
    rating: number,                // Customer rating
    bestseller: boolean,           // Whether it's a bestseller
    available: boolean,            // Availability status
    size: {                        // Size options
        [size: string]: {
            price: number          // Price for this size
        }
    },
    customizations: string[]       // Available customizations
}
```

## 6. Security Considerations

### 6.1 Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and create only their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow update: if false;  // No direct updates allowed
      allow delete: if false;  // No deletions allowed
    }
  }
}
```

### 6.2 Authentication

The current implementation uses a demo user ID (`"demo-user-123"`) for testing purposes. In a production environment, Firebase Authentication would be fully implemented to:

- Secure user data
- Ensure users can only access their own orders
- Track user-specific information
- Implement admin roles for order management

## 7. Offline Capabilities

The application implements robust offline capabilities:

1. **Local Storage Fallback**: If Firestore operations fail, the app falls back to using local storage
2. **Order Synchronization**: Orders created offline are flagged and could be synchronized later
3. **Resilient User Experience**: Users can continue using the app even when offline

## 8. Future Improvements

1. **Full Authentication Implementation**: Replace demo user with proper authentication
2. **Advanced Querying**: Implement pagination and filtering for large order histories
3. **Real-time Updates**: Leverage Firestore's real-time capabilities for live order status
4. **Order Processing Workflow**: Add complete backend workflow for order processing
5. **Analytics Integration**: Track order patterns and user preferences

## 9. Conclusion

The Coffee Shop implementation uses a modern, serverless architecture with Firebase as the backend service. This approach provides:

- Scalability without managing servers
- Built-in authentication and security
- Real-time database capabilities
- Offline functionality
- Cross-platform compatibility

The combination of React's Context API for state management and Firebase for backend services creates a robust, maintainable codebase that can easily scale as the application grows. 