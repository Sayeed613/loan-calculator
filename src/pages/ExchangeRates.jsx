import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, Typography, Box, CircularProgress
} from '@mui/material';
import axios from 'axios';

import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ExchangeRates = () => {
  const { mode } = useAppContext();
  const isDarkMode = mode === 'dark';
  const navigate = useNavigate();
  const [rates, setRates] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const rowsPerPage = 10;

  const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/INR`);
        const data = Object.entries(response.data.conversion_rates).map(
          ([currency, rate]) => ({ currency, rate })
        );
        setRates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setError(error);

      }
    };
    fetchRates();
  }, []);
  useEffect(() => {
    if (!loading && error) {
      navigate('/404');
    }
  }, [loading, error, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const visibleRows = rates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box p={4} className='h-screen' sx={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'white' : 'black' }}>
      <Typography variant='h4'>Live Exchange Rates (Base: INR)</Typography>
      {loading ? (
        <Box display='flex' justifyContent='center' mt={4}>
          <CircularProgress color={isDarkMode ? 'inherit' : 'primary'} />
        </Box>
      ) : (
        <Box className='mt-8'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: isDarkMode ? 'white' : 'black' }}><strong>Currency</strong></TableCell>
                  <TableCell sx={{ color: isDarkMode ? 'white' : 'black' }}><strong>Rate</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.currency}>
                    <TableCell sx={{ color: isDarkMode ? 'white' : 'black' }}>{row.currency}</TableCell>
                    <TableCell sx={{ color: isDarkMode ? 'white' : 'black' }}>{row.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={rates.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            sx={{ color: isDarkMode ? 'white' : 'black' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ExchangeRates;
