import axios from 'axios';

const ROOT_URL = _API_;



export function fetchGet(props){

    const url = `${ROOT_URL}${props.url}`;

    return new Promise(function(resolve, reject) {

        const request = axios({
            url,
            method: 'get',
            headers: {
                Authorization: sessionStorage.getItem('id_token'),
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
        });

        request.then(function (response) {
            resolve(response);
        }).catch(error => {
            if (error.response) {
                // Response has been received from the server
                reject(error.response.data);
            }
        });

    });

}

export function fetchPost(props){

    const url = `${ROOT_URL}${props.url}`;
    const data = props.data;

    return new Promise(function(resolve, reject) {

        const request = axios({
            url,
            method: 'post',
            headers: {
                Authorization: sessionStorage.getItem('id_token'),
                Accept: 'application/json',
            },
            data,
        });

        request.then(function (response) {
            resolve(response);
        }).catch(
            error => {
                if (error.response) {
                    // Response has been received from the server
                    reject(error.response.data);
                }
            });

    });


}
