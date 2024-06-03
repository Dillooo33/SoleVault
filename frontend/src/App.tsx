import React from 'react'
import Header from './components/NavbarComponent'
import Home from './pages/Home'
import ProductComponent from './components/ProductComponent'
import ProductList from './components/ProductList'
import ContactPage from './pages/Contact'
import AboutPage from './pages/About'
import LoginPage from './pages/Login'
import FooterCard from './components/FooterComponent'
import Cart from './pages/cart'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <CssBaseline />
            <Router>
                <Header />
                <Routes>
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/shoe/:id" element={<ProductComponent />} />
                    <Route path="/shoes" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                <FooterCard />
            </Router>
        </Box>
    )
}

export default App
