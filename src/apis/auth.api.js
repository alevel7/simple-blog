import api from "./api"


export const login = async (data) => {
    const response = await api.post('/api/users/login', data);
    return response.data;
}