import AxiosService from "../../../AxiosService";
import { OrderUrls } from '../../../Urls.js';

const axiosService = new AxiosService();

export const getOrders = async (userId) => {

    const order = await axiosService.get(OrderUrls.getOrders(userId));
    
    if (order.data) {
        return order.data;
    } else {
        return false;
    }
}

export const cancelOrder = async (orderId) => {
    
    const order = await axiosService.post(OrderUrls.cancelOrder(orderId));
    
    if (order.data) {
        return order.data;
    } else {
        return false;
    }
}