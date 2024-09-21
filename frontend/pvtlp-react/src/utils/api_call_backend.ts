import axios from 'axios';
import {fetchAuthSession} from "aws-amplify/auth";
import {API_Endpoint} from "./api_endpoints";

const baseUrl = 'http://18.132.89.253:8000/';

export const apiCallBackend = async (url: string, method: string, data?: any) => {
    const response = await axios({
        method,
        url,
        data,
    });

    return response.data;
};

export const isAdminGetCallToBackend = async () => {
    let apiEndPoint = API_Endpoint.Is_Admin;
    console.log('isAdminGetCallToBackend called for the table: '+ apiEndPoint); // Log to check if function is called
    let json;
    const jwtToken = await getJwtToken();
    let fullUrl = baseUrl + apiEndPoint + '?jwt_token=' + jwtToken;
    console.log('fullUrl: ', fullUrl);
    try {
        const response = await apiCallBackend(fullUrl, 'GET');
        json = JSON.stringify(response);
        console.log('data retrieved: ', json); // Log to check the transactions
        return json;
    } catch (error) {
        console.error('Failed to fetch and parse Endpoint of: ' + apiEndPoint, error);
        throw error;
    }
}

export const getCallToBackend = async (apiEndPoint: string, dataType: any) => {
    console.log('getCallToBackend called for the table: '+ apiEndPoint); // Log to check if function is called
    let json;
    try {
        const response = await apiCallBackend(baseUrl + apiEndPoint, 'GET');
        json = JSON.stringify(response);
        let retrievedData: typeof dataType[] = JSON.parse(json);
        console.log('data retrieved: ', retrievedData); // Log to check the transactions
        return retrievedData;
    } catch (error) {
        console.error('Failed to fetch and parse Endpoint of: ' + apiEndPoint, error);
        throw error;
    }
}

export const postCallToBackend = async (apiEndPoint: string, data: any) => {
    console.log('postCallToBackend called for the table: '+ apiEndPoint); // Log to check if function is called
    let json;
    try {
        const response = await apiCallBackend(baseUrl + apiEndPoint, 'POST', data);
        json = JSON.stringify(response);
        console.log('data retrieved: ', json); // Log to check the transactions
        return json;
    } catch (error) {
        console.error('Failed to fetch and parse Endpoint of: ' + apiEndPoint, error);
        throw error;
    }
}

export const deleteCallToBackend = async (apiEndPoint: string, pk: string) => {
    const jwtToken = await getJwtToken();
    console.log('deleteCallToBackend called for the table: '+ apiEndPoint); // Log to check if function is called
    let json;
    let fullUrl = baseUrl + apiEndPoint + '/' + pk + '?jwt_token=' + jwtToken;
    try {
        console.log('fullUrl: ', fullUrl);
        const response = await apiCallBackend(fullUrl, 'DELETE');
        json = JSON.stringify(response);
        console.log('data retrieved: ', json); // Log to check the transactions
        return json;
    } catch (error) {
        console.error('Failed to fetch and parse Endpoint of: ' + apiEndPoint, error);
        throw error;
    }
}

export async function getJwtToken() {
    const session = await fetchAuthSession();
    if (session.tokens && session.tokens.idToken) {
        const jwtToken = session.tokens.idToken.toString();
        console.log("id token G", jwtToken);
        return jwtToken;
    } else {
        console.error("Tokens or idToken is undefined");
    }
}

export async function updateTransactionCallToBackend(transaction_id: string, data: any) {
    console.log('updateTransactionCallToBackend called for the table: '+ API_Endpoint.Update_Transaction); // Log to check if function is called
    let json;
    try {
        const response = await apiCallBackend(baseUrl + API_Endpoint.Update_Transaction + '/' + transaction_id, 'PATCH', data);
        json = JSON.stringify(response);
        console.log('data retrieved: ', json); // Log to check the transactions
        return json;
    } catch (error) {
        console.error('Failed to fetch and parse Endpoint of: ' + API_Endpoint.Update_Transaction, error);
        throw error;
    }
}