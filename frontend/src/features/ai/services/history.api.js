import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export async function getHistory() {
    const response = await api.get('/history')
    return response.data
}

export async function getHistoryById(id) {
    const response = await api.get(`/history/${id}`)
    return response.data
}