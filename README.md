# Coffee Shop Web Application

A modern React-based Coffee Shop web application with e-commerce features, a blog, menu, cart functionality, and order tracking.

## Features

- Modern UI with responsive design for all devices
- Shop page with product listings and filtering options
- Interactive cart with Swiggy/Zomato-style checkout process
- Order history tracking integrated with Firebase
- Menu with filtering options by category, price, and more
- Blog section with detailed articles
- About and Contact pages

## Firebase Setup

This application uses Firebase for storing order data. Follow these steps to set up Firebase:

1. Create a Firebase account at [firebase.google.com](https://firebase.google.com/)
2. Create a new Firebase project
3. Add a web app to your Firebase project
4. Enable Firestore Database in your project
5. Replace the Firebase configuration in `src/firebase/firebase.js` with your own:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

6. Set up Firestore security rules to secure your data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow update: if false;
      allow delete: if false;
    }
  }
}
```

## Installation and Setup

1. Clone the repository:
```
git clone https://github.com/yourusername/coffeeshop.git
cd coffeeshop
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Build for production:
```
npm run build
```

## Authentication (Future Implementation)

Currently, the application uses a demo user ID. In a production environment, implement Firebase Authentication:

1. Enable Authentication in your Firebase project
2. Update the OrderContext to use the authenticated user's ID
3. Implement login/signup functionality

## License

MIT
