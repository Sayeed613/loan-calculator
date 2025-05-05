import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import ExchangeRates from '../pages/ExchangeRates'
import ErrorPage from '../pages/ErrorPage'

const AllRoutes = () => {
  return (
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/exchange" element={<ExchangeRates />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<ErrorPage />} />
        </Routes>
  )
}

export default AllRoutes