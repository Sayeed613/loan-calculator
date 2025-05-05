import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

export const useExchangeRates = (base = 'INR') => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`);
                setRates(response.data.conversion_rates);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchRates();
    }, [base]);

    useEffect(() => {
        if (!loading) {
            if (error) {
                navigate('/404');
            }
        }
    }, [error, loading, navigate]);

    return { rates, loading, error };
};
