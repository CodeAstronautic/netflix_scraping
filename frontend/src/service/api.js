import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const getData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/companies`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/companies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const postData = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/companies/scrape`, payload);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

export const deleteData = async (payload) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/companies/delete-multiple-company`, { data: payload });
        return response.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
};
