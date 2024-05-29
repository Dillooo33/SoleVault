import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/NavbarComponent'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import './App.css'
import Home from './pages/Home'

const App: React.FC = () => {
    return (
        <Router>
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <CssBaseline />
                <Header />
                <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Box>
                {/* <Footer /> */}
            </Box>
        </Router>
    )
}

export default App
