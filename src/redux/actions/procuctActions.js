import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export const fetchProducts = (category = '', page = 0) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: {
          category: category,
          limit: 10,
          skip: page * 10, // Adjust page number for pagination
        },
      });
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data.products });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/products/categories`);
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
  };
};
