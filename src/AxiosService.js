import React from 'react';
import axios from 'axios';

export default class AxiosService extends React.Component {

    async post(url, credentialsObject) {
        const response = await axios.post((process.env.REACT_APP_API_URL + url), credentialsObject)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });

        return response;
    }

    async get(url) {
        const response = await axios.get((process.env.REACT_APP_API_URL + url))
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });

        return response;
    }
}