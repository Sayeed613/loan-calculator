# Loan Calculator

A modern web application built with React that helps users calculate loan EMIs (Equated Monthly Installments) and view real-time currency exchange rates.

## Features

- 🧮 EMI Calculator with customizable:
  - Principal amount
  - Interest rate
  - Loan duration
- 💱 Live currency exchange rates
- 📊 Detailed amortization schedule
- 🌓 Dark/Light mode toggle
- 📱 Responsive design for all devices
- 💾 Local storage for user preferences

## Tech Stack

- **React** - Frontend library
- **Material UI** - UI component library
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/Sayeed613/loan-calculator.git
cd loan-calculator
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Exchange Rate API key
```env
VITE_EXCHANGE_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Environment Variables

- `VITE_EXCHANGE_API_KEY` - API key for the Exchange Rate API

## Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
loan-calculator/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable components
│   ├── context/      # React Context providers
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── App.jsx       # Root component
│   └── main.jsx      # Entry point
├── .env              # Environment variables
├── index.html        # HTML template
└── package.json      # Project dependencies
```

## API Integration

The app uses the Exchange Rate API (v6) for currency conversion. Features include:
- Real-time exchange rates
- Support for 160+ currencies
- Daily rate updates

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Exchange Rate API](https://www.exchangerate-api.com/) for providing currency conversion data
- [Material UI](https://mui.com/) for the component library
- [TailwindCSS](https://tailwindcss.com/) for utility classes

## Deployed Link
- https://loan-calculator-lzg0.onrender.com/