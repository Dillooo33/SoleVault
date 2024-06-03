import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import HeroImg from '../assets/bilder/Hero.png'

const HeroSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    backgroundImage: `url(${HeroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
    marginTop: theme.spacing(-3)
}))

const Hero: React.FC = () => {
    return (
        <HeroSection>
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 600, fontSize: '2rem' }}
            >
                VINTER REA
            </Typography>
            <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 400, fontSize: '2.5rem' }}
            >
                PÅ SOLEVAULT
            </Typography>
            <Link to={'/shoes'}>
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        paddingX: 4,
                        paddingY: 1.5,
                        backgroundColor: '#1B3445',
                        marginTop: '2rem',
                        minWidth: '198px',
                        fontSize: '1rem'
                    }}
                >
                    Till Rean
                </Button>
            </Link>
        </HeroSection>
    )
}

export default Hero
