import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export async function getProducts({ page = 1, limit = 9, q = '', sortBy = '', order = '' }) {
  const skip = (page - 1) * limit;
  const endpoint = q ? '/products/search' : '/products';

  const params = { limit, skip };
  if (q) params.q = q;
  if (sortBy) {
    params.sortBy = sortBy;
    params.order = order || 'asc';
  }

  const { data } = await http.get(endpoint, { params });
  return data; 
}

export async function getProduct(id) {
  const { data } = await http.get(`/products/${id}`);
  return data;
}