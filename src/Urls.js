export const signupUrls = {
    signup: () => {
        return '/signup';
    }
}

export const LoginUrls = {
    login: () => {
        return '/login';
    }
}

export const UserUrls = {
    findUser: (userToken) => {
        return `/findUser/${userToken}`;
    }
}

export const ProductUrls = {
    getAllProducts: () => {
        return '/getAllProducts';
    },
    getProduct: (productId) => {
        return `/getProduct/${productId}`;
    },
    addToCart: () => {
        return '/addToCart';
    },
}

export const CartUrls = {
    getCart: (userId) => {
        return `/getCart/${userId}`;
    },
    removeProduct: (productId) => {
        return `/removeFromCart/${productId}`;
    },
    increaseQuantity: (productId) => {
        return `/increaseQty/${productId}`;
    },
    decreaseQuantity: (productId) => {
        return `/decreaseQty/${productId}`;
    },
    getCartDetails: (userId) => {
        return `/getCartDetails/${userId}`;
    },
    editUserAddress: (userId) => {
        return `/editUserAddress/${userId}`;
    },
    cartCount: (userId) => {
        return `/cartCount/${userId}`;
    }
}

export const OrderUrls = {
    addOrder: () => {
        return `/addOrder`;
    },
    getOrders: (userId) => {
        return `/getOrders/${userId}`;
    },
    cancelOrder: (orderId) => {
        return `/cancelOrder/${orderId}`;
    },
    clearCart: (userId) => {
        return `/clearCart/${userId}`;
    },
}