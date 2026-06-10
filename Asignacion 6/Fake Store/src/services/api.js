const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};