import React from 'react'
import { Box, Typography, Button, Divider } from '@mui/material'
import Hero from '../components/HeroComponent'

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Box>
                <Box sx={{ padding: 2 }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                        >
                            Sneakers
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                fontWeight: 700,
                                borderRadius: 50,
                                paddingX: 1.5,
                                paddingY: 1,
                                backgroundColor: '#1B3445',
                                fontSize: '0.8rem'
                            }}
                        >
                            Visa alla skor
                        </Button>
                    </Box>
                    <Divider sx={{ marginTop: 1 }} />
                </Box>
            </Box>
        </>
    )
}

export default Home
