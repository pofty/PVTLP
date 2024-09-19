import axios from 'axios';

const baseUrl = 'http://18.132.89.253:8000/';

export const apiCallBackend = async (url: string, method: string, data?: any) => {
    const response = await axios({
        method,
        url,
        data,
    });

    return response.data;
};

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