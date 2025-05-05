import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { useExchangeRates } from '../hooks/useExchangeRates';


const Home = () => {
  const { currency, setCurrency, mode } = useAppContext();
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanDuration, setLoanDuration] = useState(12);
  const [showResults, setShowResults] = useState(false);



  const { rates } = useExchangeRates('INR');
  const { emi, amortizationSchedule, calculateEMI } = useEMICalculator();

  const isDarkMode = mode === 'dark';

  const convertedEMI = currency === 'INR' ? emi : (emi * rates[currency]).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(principal) > 0 && Number(interestRate) > 0) {
      calculateEMI(Number(principal), Number(interestRate), loanDuration);
      setShowResults(true);
      localStorage.setItem('emiInputs', JSON.stringify({
        principal,
        interestRate,
        loanDuration
      }));
    } else {
      setShowResults(false);
    }
  };

  const handleReset = () => {
    setPrincipal('');
    setInterestRate('');
    setLoanDuration(12);
    setShowResults(false);
    localStorage.removeItem('emiInputs');
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('emiInputs'));
    if (saved) {
      setPrincipal(saved.principal);
      setInterestRate(saved.interestRate);
      setLoanDuration(saved.loanDuration);
      calculateEMI(Number(saved.principal), Number(saved.interestRate), saved.loanDuration);
      setShowResults(true);
    }

    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  return (
    <Box className={`w-full p-4 sm:p-8 min-h-screen overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="w-full p-6 shadow-none  overflow-hidden">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-semibold text-start">
            Loan EMI Calculator
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="space-y-5 flex flex-wrap gap-8 justify-between lg:w-3/4">
          <TextField
            label="Loan Amount"
            variant="outlined"
            fullWidth
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            type="number"
            required
            sx={{ maxWidth: '300px' }}
            inputProps={{ style: { color: isDarkMode ? 'white' : 'black' } }}
          />
          <TextField
            label="Interest Rate (%)"
            variant="outlined"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            type="number"
            required
            sx={{ maxWidth: '300px' }}
            inputProps={{ style: { color: isDarkMode ? 'white' : 'black' } }}
          />
          <FormControl fullWidth sx={{ maxWidth: '300px' }}>
            <InputLabel>Term (months)</InputLabel>
            <Select
              value={loanDuration}
              onChange={(e) => setLoanDuration(e.target.value)}
              label="Loan Duration"
              sx={{
                color: isDarkMode ? 'white' : 'black',
                '.MuiOutlinedInput-notchedOutline': { borderColor: isDarkMode ? 'white' : 'black' },
              }}
            >
              {[12, 24, 36, 48, 60].map((duration) => (
                <MenuItem key={duration} value={duration}>
                  {duration} months
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ maxWidth: '300px' }}
          >
            Calculate EMI
          </Button>
        </form>
      </div>

      {showResults && emi && (
        <>
          <Box className="flex flex-col gap-4 mt-6 px-6">
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="p" className="font-semibold">
                Your Monthly EMI (INR):
              </Typography>
              <Typography className="text-green-600 text-lg">₹ {emi}</Typography>
            </Box>

            <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
              <Box className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
                <FormControl size="small" sx={{ minWidth: '120px' }}>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    label="Currency"
                    sx={{
                      color: isDarkMode ? 'white' : 'black',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? 'white' : 'black',
                      },
                    }}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="p" className="font-semibold mt-2 sm:mt-0">
                  Converted EMI: <span className="text-green-600">{currency} {convertedEMI}</span>
                </Typography>
              </Box>

              {/* Reset Button */}
              <Box className="flex justify-start sm:justify-end w-full sm:w-auto">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReset}
                  sx={{ maxWidth: '150px' }}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Box>



          <div className="w-full p-6 mt-8 shadow-none">
            <Typography variant="h4" className="mb-2 font-medium">
              Amortization Schedule
            </Typography>

            <TableContainer component={Paper} sx={{ maxHeight: 430, overflowY: 'auto', marginTop: "30px" }}>
              <Table stickyHeader size="small">
                <TableHead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}>
                  <TableRow>
                    <TableCell align="center">Month</TableCell>
                    <TableCell align="center">Principal</TableCell>
                    <TableCell align="center">Interest</TableCell>
                    <TableCell align="center">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortizationSchedule.map((item) => (
                    <TableRow key={item.month}>
                      <TableCell align="center">{item.month}</TableCell>
                      <TableCell align="center">{currency} {item.principal}</TableCell>
                      <TableCell align="center">{currency} {item.interest}</TableCell>
                      <TableCell align="center">{currency} {item.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </Box>
  );
};

export default Home;
