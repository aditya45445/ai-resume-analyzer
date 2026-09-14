import axios from "axios";

const api = axios.create({
    baseURL: 'https://ai-resume-analyzer-sd4c.onrender.com/api',
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