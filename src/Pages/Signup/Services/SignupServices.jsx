import AxiosService from "../../../AxiosService";
import { signupUrls } from '../../../Urls.js';

const axiosService = new AxiosService();

export const signup = async (signupCredentials) => {

    const user = await axiosService.post(signupUrls.signup(), signupCredentials);

    if (user.data || user.response.data) {
        return user.data || user.response.data;
    } else {
        return false;
    }
}