import React from 'react'
import Header from './components/NavbarComponent'
import Hero from './components/HeroComponent'
/* import ProductList from './components/ProductList'
import Footer from './components/FooterComponent' */
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import './App.css'

const App: React.FC = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <CssBaseline />
            <Header />
            <Hero />
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                {/* <ProductList /> */}
            </Box>
            {/* <Footer /> */}
        </Box>
    )
}

export default App
