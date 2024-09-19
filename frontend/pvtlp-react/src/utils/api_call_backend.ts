import axios from 'axios';
import {Customer, Title, Transaction} from "../tables/data"
import {table} from "@nextui-org/theme";

const baseUrl = 'http://18.132.89.253:8000/';


export const apiCallBackend = async (url: string, method: string, data?: any) => {
    const response = await axios({
        method,
        url,
        data,
    });

    return response.data;
};

export const getTransactions = async () => {
    console.log('getTransactions called'); // Log to check if function is called
    let json;
    try {
        const response = await apiCallBackend(baseUrl+ "transactions", 'GET');
        json = JSON.stringify(response);
        let transactions: Transaction[] = JSON.parse(json);
        console.log('Transactions', transactions); // Log to check the transactions
        return transactions;
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
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
        console.error('Failed to fetch and parse table of: ' + table, error);
        throw error;
    }
}