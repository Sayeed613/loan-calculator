import React from "react";
import { Box, Typography, Grid, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useAppContext } from '../context/AppContext';

const About = () => {
  const { mode } = useAppContext();
  const isDarkMode = mode === 'dark';
  return (
    <Box className="p-4 min-h-screen" sx={{
      margin: 'auto',
      paddingTop: '30px',
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
    }}>
      <Typography variant="h4" className="text-start font-bold mb-4">
        About This App
      </Typography>

      <Typography variant="body1" paragraph>
        This is a loan EMI calculator app built using React, Material UI, and TailwindCSS. It allows users to calculate
        their monthly EMI for a loan, view live exchange rates, and more. The app uses live exchange rate APIs to
        convert EMI values to different currencies.
      </Typography>

      <Typography variant="h6" className="font-semibold mb-2">
        Technologies Used
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box elevation={3} sx={{ padding: '16px', textAlign: 'start' }}>
            <Typography variant="h6">React</Typography>
            <Typography variant="body2">A JavaScript library for building user interfaces.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box elevation={3} sx={{ padding: '16px', textAlign: 'start' }}>
            <Typography variant="h6">Material UI</Typography>
            <Typography variant="body2">A popular React UI framework for responsive design.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box elevation={3} sx={{ padding: '16px', textAlign: 'start' }}>
            <Typography variant="h6">Tailwind CSS</Typography>
            <Typography variant="body2">A utility-first CSS framework for rapid UI development.</Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" className="font-semibold mt-6 mb-2">
        Key Features
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Loan EMI Calculator"
            secondary="Calculate your monthly EMI for loans with customizable principal amount, interest rate, and loan duration."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Live Exchange Rates"
            secondary="View real-time exchange rates powered by Exchange Rate API, supporting multiple currencies including USD, EUR, and INR."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Amortization Schedule"
            secondary="View detailed loan amortization schedule showing monthly breakup of principal and interest payments."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Dark/Light Mode"
            secondary="Toggle between dark and light themes for comfortable viewing in any lighting condition."
          />
        </ListItem>
      </List>

      <Typography variant="h6" className="font-semibold mt-6 mb-2">
        Technical Details
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="State Management"
            secondary="Uses React Context API for global state management of theme and currency preferences."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Responsive Design"
            secondary="Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Local Storage"
            secondary="Persists user preferences and last calculation data using browser's local storage."
          />
        </ListItem>
      </List>

      <Typography variant="h6" className="font-semibold mt-6 mb-2">
        API Integration
      </Typography>
      <Typography variant="body2" paragraph>
        The application integrates with the Exchange Rate API (v6) to provide real-time currency conversion rates.
        The API provides access to:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Live Exchange Rates"
            secondary="Updated every 24 hours for accurate currency conversion"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Multiple Currencies"
            secondary="Support for over 160 currencies worldwide"
          />
        </ListItem>
      </List>

      <Typography variant="h6" className="font-semibold mt-6 mb-2">
        Version Information
      </Typography>
      <Typography variant="body2">
        Current Version: 1.0.0
      </Typography>
      <Typography variant="body2">
        Last Updated: May 2025
      </Typography>

      <Divider sx={{ marginY: 4 }} />

      <Typography variant="body2" className="text-center text-gray-600 dark:text-gray-400">
        © 2025 Loan Calculator. All rights reserved.
      </Typography>
    </Box>
  );
};

export default About;