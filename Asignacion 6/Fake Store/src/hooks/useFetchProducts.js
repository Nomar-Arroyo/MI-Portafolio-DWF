import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

  // Retornamos los tres estados para que el componente los consuma
  return { products, loading, error };
};