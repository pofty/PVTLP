import axios from 'axios';
import {Customer, Transaction} from "../tables/data"

const baseUrl = 'http://localhost:8000/';


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

export const getCustomers = async () => {
    console.log('getTransactions called'); // Log to check if function is called
    let json;
    try {
        const response = await apiCallBackend(baseUrl+ "customers", 'GET');
        json = JSON.stringify(response);
        let transactions: Customer[] = JSON.parse(json);
        console.log('Customers', transactions); // Log to check the transactions
        return transactions;
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        throw error;
    }
}