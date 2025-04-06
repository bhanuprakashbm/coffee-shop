const menuItems = [
    // Coffee Section
    {
        id: 101,
        name: "Espresso",
        category: "coffee",
        subcategory: "espresso",
        price: 249,
        description: "Strong black coffee made by forcing steam through ground coffee beans",
        image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.7,
        reviews: 238,
        tags: ["hot", "classic", "strong"],
        bestseller: true,
        available: true,
        size: {
            small: { label: "Single", price: 249 },
            medium: { label: "Double", price: 329 },
            large: { label: "Triple", price: 415 }
        }
    },
    {
        id: 102,
        name: "Cappuccino",
        category: "coffee",
        subcategory: "milk-based",
        price: 329,
        description: "Espresso with steamed milk foam",
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.8,
        reviews: 312,
        tags: ["hot", "milk", "popular"],
        bestseller: true,
        available: true,
        size: {
            small: { label: "Small", price: 329 },
            medium: { label: "Medium", price: 415 },
            large: { label: "Large", price: 499 }
        }
    },
    {
        id: 103,
        name: "Latte",
        category: "coffee",
        subcategory: "milk-based",
        price: 329,
        description: "Espresso with steamed milk",
        image: "https://images.pexels.com/photos/350478/pexels-photo-350478.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.6,
        reviews: 287,
        tags: ["hot", "milk", "popular"],
        bestseller: false,
        available: true,
        size: {
            small: { label: "Small", price: 329 },
            medium: { label: "Medium", price: 415 },
            large: { label: "Large", price: 499 }
        }
    },
    {
        id: 104,
        name: "Americano",
        category: "coffee",
        subcategory: "espresso",
        price: 249,
        description: "Espresso with hot water",
        image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.4,
        reviews: 201,
        tags: ["hot", "classic"],
        bestseller: false,
        available: true,
        size: {
            small: { label: "Small", price: 249 },
            medium: { label: "Medium", price: 329 },
            large: { label: "Large", price: 415 }
        }
    },
    {
        id: 105,
        name: "Macchiato",
        category: "coffee",
        subcategory: "espresso",
        price: 289,
        description: "Espresso with a small amount of milk foam",
        image: "https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.5,
        reviews: 178,
        tags: ["hot", "classic"],
        bestseller: false,
        available: true,
        size: {
            small: { label: "Small", price: 289 },
            medium: { label: "Medium", price: 375 },
            large: { label: "Large", price: 455 }
        }
    },
    {
        id: 106,
        name: "Mocha",
        category: "coffee",
        subcategory: "milk-based",
        price: 375,
        description: "Espresso with chocolate and steamed milk",
        image: "https://images.pexels.com/photos/5946643/pexels-photo-5946643.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.7,
        reviews: 245,
        tags: ["hot", "milk", "sweet"],
        bestseller: true,
        available: true,
        size: {
            small: { label: "Small", price: 375 },
            medium: { label: "Medium", price: 455 },
            large: { label: "Large", price: 539 }
        }
    },

    // Tea Section
    {
        id: 201,
        name: "Earl Grey",
        category: "tea",
        subcategory: "black-tea",
        price: 249,
        description: "Black tea with bergamot oil",
        image: "https://images.pexels.com/photos/227908/pexels-photo-227908.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.3,
        reviews: 156,
        tags: ["hot", "classic"],
        bestseller: false,
        available: true,
        size: {
            small: { label: "Small", price: 249 },
            medium: { label: "Medium", price: 289 },
            large: { label: "Large", price: 329 }
        }
    },
    {
        id: 202,
        name: "Green Tea",
        category: "tea",
        subcategory: "green-tea",
        price: 249,
        description: "Antioxidant-rich steeped green tea leaves",
        image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.5,
        reviews: 203,
        tags: ["hot", "healthy"],
        bestseller: true,
        available: true,
        size: {
            small: { label: "Small", price: 249 },
            medium: { label: "Medium", price: 289 },
            large: { label: "Large", price: 329 }
        }
    },
    {
        id: 203,
        name: "Chai Latte",
        category: "tea",
        subcategory: "milk-tea",
        price: 329,
        description: "Spiced black tea with steamed milk",
        image: "https://images.pexels.com/photos/209428/pexels-photo-209428.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.7,
        reviews: 234,
        tags: ["hot", "spicy", "milk"],
        bestseller: true,
        available: true,
        size: {
            small: { label: "Small", price: 329 },
            medium: { label: "Medium", price: 375 },
            large: { label: "Large", price: 415 }
        }
    },
    {
        id: 204,
        name: "Herbal Infusion",
        category: "tea",
        subcategory: "herbal-tea",
        price: 289,
        description: "Soothing blend of herbs and flowers",
        image: "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.4,
        reviews: 187,
        tags: ["hot", "healthy", "caffeine-free"],
        bestseller: false,
        available: true,
        size: {
            small: { label: "Small", price: 289 },
            medium: { label: "Medium", price: 329 },
            large: { label: "Large", price: 375 }
        }
    },

    // Pastries Section
    {
        id: 301,
        name: "Croissant",
        category: "pastries",
        subcategory: "bakery",
        price: 205,
        description: "Buttery, flaky pastry",
        image: "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.6,
        reviews: 219,
        tags: ["breakfast", "classic"],
        bestseller: true,
        available: true
    },
    {
        id: 302,
        name: "Chocolate Muffin",
        category: "pastries",
        subcategory: "bakery",
        price: 249,
        description: "Moist chocolate muffin with chocolate chips",
        image: "https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.7,
        reviews: 245,
        tags: ["sweet", "chocolate"],
        bestseller: true,
        available: true
    },
    {
        id: 303,
        name: "Cinnamon Roll",
        category: "pastries",
        subcategory: "bakery",
        price: 289,
        description: "Sweet roll with cinnamon and frosting",
        image: "https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.8,
        reviews: 267,
        tags: ["sweet", "breakfast"],
        bestseller: true,
        available: true
    },
    {
        id: 304,
        name: "Blueberry Scone",
        category: "pastries",
        subcategory: "bakery",
        price: 249,
        description: "Flaky pastry filled with fresh blueberries",
        image: "https://images.pexels.com/photos/5386673/pexels-photo-5386673.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.5,
        reviews: 189,
        tags: ["breakfast", "fruit"],
        bestseller: false,
        available: true
    },

    // Savory Items Section
    {
        id: 401,
        name: "Avocado Toast",
        category: "savory",
        subcategory: "toast",
        price: 499,
        description: "Toasted bread with mashed avocado and seasonings",
        image: "https://images.pexels.com/photos/1824353/pexels-photo-1824353.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.6,
        reviews: 213,
        tags: ["breakfast", "lunch", "healthy"],
        bestseller: true,
        available: true
    },
    {
        id: 402,
        name: "Chicken Panini",
        category: "savory",
        subcategory: "sandwich",
        price: 579,
        description: "Grilled sandwich with chicken, cheese, and pesto",
        image: "https://images.pexels.com/photos/4811651/pexels-photo-4811651.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.7,
        reviews: 234,
        tags: ["lunch", "protein"],
        bestseller: true,
        available: true
    },
    {
        id: 403,
        name: "Veggie Wrap",
        category: "savory",
        subcategory: "wrap",
        price: 455,
        description: "Tortilla wrap with assorted vegetables and hummus",
        image: "https://images.pexels.com/photos/5945760/pexels-photo-5945760.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.4,
        reviews: 178,
        tags: ["lunch", "vegetarian", "healthy"],
        bestseller: false,
        available: true
    },
    {
        id: 404,
        name: "Quiche Lorraine",
        category: "savory",
        subcategory: "baked",
        price: 415,
        description: "Savory pie with bacon, cheese, and eggs",
        image: "https://images.pexels.com/photos/6939143/pexels-photo-6939143.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.6,
        reviews: 201,
        tags: ["breakfast", "lunch", "protein"],
        bestseller: false,
        available: true
    },

    // Cold Drinks Section
    {
        id: 501,
        name: "Iced Coffee",
        category: "cold-drinks",
        subcategory: "coffee",
        price: 289,
        description: "Chilled coffee served over ice",
        image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.5,
        reviews: 221,
        tags: ["cold", "refreshing"],
        bestseller: true,
        available: true,
        size: {
            small: { label: "Small", price: 289 },
            medium: { label: "Medium", price: 375 },
            large: { label: "Large", price: 455 }
        }
    },
    {
        id: 502,
        name: "Cold Brew",
        category: "cold-drinks",
        subcategory: "coffee",
        price: 329,
        description: "Smooth coffee brewed with cold water for 12-24 hours",
        image: "https://images.pexels.com/photos/1727123/pexels-photo-1727123.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.7,
        reviews: 256,
        tags: ["cold", "strong", "refreshing"],
        bestseller: true,
        available: true,
        size: {
            small: { label: "Small", price: 329 },
            medium: { label: "Medium", price: 415 },
            large: { label: "Large", price: 499 }
        }
    },
    {
        id: 503,
        name: "Iced Tea",
        category: "cold-drinks",
        subcategory: "tea",
        price: 249,
        description: "Chilled tea served over ice with optional lemon",
        image: "https://images.pexels.com/photos/792613/pexels-photo-792613.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.3,
        reviews: 189,
        tags: ["cold", "refreshing"],
        bestseller: false,
        available: true,
        size: {
            small: { label: "Small", price: 249 },
            medium: { label: "Medium", price: 329 },
            large: { label: "Large", price: 415 }
        }
    },
    {
        id: 504,
        name: "Fruit Smoothie",
        category: "cold-drinks",
        subcategory: "smoothie",
        price: 415,
        description: "Blended fruits with yogurt and ice",
        image: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.8,
        reviews: 278,
        tags: ["cold", "refreshing", "healthy", "fruit"],
        bestseller: true,
        available: true,
        size: {
            small: { label: "Small", price: 415 },
            medium: { label: "Medium", price: 499 },
            large: { label: "Large", price: 579 }
        }
    },

    // Desserts Section
    {
        id: 601,
        name: "Chocolate Cake",
        category: "desserts",
        subcategory: "cake",
        price: 415,
        description: "Rich, moist chocolate cake with ganache",
        image: "https://images.pexels.com/photos/264892/pexels-photo-264892.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.8,
        reviews: 267,
        tags: ["sweet", "chocolate", "indulgent"],
        bestseller: true,
        available: true
    },
    {
        id: 602,
        name: "Cheesecake",
        category: "desserts",
        subcategory: "cake",
        price: 415,
        description: "Creamy cheesecake with graham cracker crust",
        image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.7,
        reviews: 234,
        tags: ["sweet", "creamy", "indulgent"],
        bestseller: true,
        available: true
    },
    {
        id: 603,
        name: "Apple Pie",
        category: "desserts",
        subcategory: "pie",
        price: 375,
        description: "Classic apple pie with cinnamon and flaky crust",
        image: "https://images.pexels.com/photos/6163263/pexels-photo-6163263.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.6,
        reviews: 198,
        tags: ["sweet", "fruit", "classic"],
        bestseller: false,
        available: true
    },
    {
        id: 604,
        name: "Chocolate Chip Cookie",
        category: "desserts",
        subcategory: "cookie",
        price: 165,
        description: "Fresh-baked cookie with chocolate chunks",
        image: "https://images.pexels.com/photos/372851/pexels-photo-372851.jpeg?auto=compress&cs=tinysrgb&w=1280",
        rating: 4.5,
        reviews: 221,
        tags: ["sweet", "chocolate", "snack"],
        bestseller: false,
        available: true
    }
];

export default menuItems; 