import api from "./api"


export const getCompanies = async () => {
    const response = await api.get('/api/companies');
    return response.data?.data;
}

export const addCompany = async (data) => {
    const response = await api.post('/api/companies', data);
    return response.data?.data;
}

export const getACompany = async ({ queryKey }) => {
    const [id] = queryKey;
    const response = await api.get('/api/companies/' + id);
    return response.data?.data;
}

export const uploadLogo = async ({ id, data }) => {
    console.log(id, data);
    const response = await api.put('/api/companies/' + id, data);
    return response.data?.data;
}