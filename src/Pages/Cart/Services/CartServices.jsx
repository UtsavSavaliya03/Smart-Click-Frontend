import AxiosService from "../../../AxiosService";
import { CartUrls, OrderUrls } from '../../../Urls.js';

const axiosService = new AxiosService();

export const getCart = async (userId) => {

    const cart = await axiosService.get(CartUrls.getCart(userId));
    
    if (cart.data) {
        return cart.data;
    } else {
        return false;
    }
}

export const removeProduct = async (productId) => {
    
    const cart = await axiosService.post(CartUrls.removeProduct(productId));
    
    if (cart.data) {
        return cart.data;
    } else {
        return false;
    }
}

export const increaseQuantity = async (productId) => {
    
    const cartProduct = await axiosService.post(CartUrls.increaseQuantity(productId));
    
    if (cartProduct.data) {
        return cartProduct.data;
    } else {
        return false;
    }
}

export const decreaseQuantity = async (productId) => {
    
    const cartProduct = await axiosService.post(CartUrls.decreaseQuantity(productId));
    
    if (cartProduct.data) {
        return cartProduct.data;
    } else {
        return false;
    }
}

export const getCartDetails = async (userId) => {
    
    const cartDetails = await axiosService.get(CartUrls.getCartDetails(userId));
    
    if (cartDetails.data) {
        return cartDetails.data;
    } else {
        return false;
    }
}

export const editUserAddress = async (userId, addressObject) => {
    
    const address = await axiosService.post(CartUrls.editUserAddress(userId), addressObject);
    
    if (address.data) {
        return address.data;
    } else {
        return false;
    }
}

export const addOrder = async (orderObject) => {

    const order = await axiosService.post(OrderUrls.addOrder(), orderObject);
    
    if (order.data) {
        return order.data;
    } else {
        return false;
    }
}

export const clearCart = async (userId) => {

    const cart = await axiosService.post(OrderUrls.clearCart(userId));
    
    if (cart.data) {
        return cart.data;
    } else {
        return false;
    }
}