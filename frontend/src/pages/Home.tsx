import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Button,
    Divider,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Rating
} from '@mui/material'
import Hero from '../components/HeroComponent'
import { Link } from 'react-router-dom'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

interface Shoe {
    id: number
    name: string
    price: number
    rating: number
    image: string
}

const Home: React.FC = () => {
    const [shoes, setShoes] = useState<Shoe[]>([])

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/shoes')
            .then((response) => {
                setShoes(response.data)
            })
            .catch((error) => {
                console.error('Fel vid hämtning av skorna!', error)
            })
    }, [])

    const handleAddToCart = (shoe: Shoe) => {
        axios
            .post('http://localhost:8080/cart', {
                name: shoe.name,
                size: 'M',
                color: 'Black',
                quantity: 1,
                price: shoe.price
            })
            .then((response) => {
                console.log('Item added to cart:', response.data)
            })
            .catch((error) => {
                console.error(
                    'There was an error adding the item to the cart!',
                    error
                )
            })
    }

    return (
        <>
            <Hero />
            <Box>
                <Box sx={{ padding: 2 }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ marginBottom: 2 }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Sneakers
                        </Typography>
                        <Link to={'/shoes'}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    fontWeight: 'bold',
                                    borderRadius: 50,
                                    paddingX: 4,
                                    paddingY: 1.2,
                                    backgroundColor: '#1B3445',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Visa alla skor
                            </Button>
                        </Link>
                    </Box>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Grid container spacing={4}>
                        {shoes.map((shoe) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={shoe.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Card
                                    sx={{
                                        maxWidth: {
                                            xs: 480,
                                            sm: 400,
                                            md: 450,
                                            lg: 550
                                        },
                                        width: '100%',
                                        position: 'relative'
                                    }}
                                >
                                    <CardActionArea
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Link
                                            to={`/shoe/${shoe.id}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit'
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    height: '300px',
                                                    objectFit: 'contain',
                                                    padding: 1
                                                }}
                                                image={shoe.image}
                                                alt={shoe.name}
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="div"
                                                >
                                                    {shoe.name}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle1"
                                                    component="div"
                                                >
                                                    {shoe.price} kr
                                                </Typography>
                                                <Rating
                                                    name="half-rating-read"
                                                    defaultValue={shoe.rating}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                            </CardContent>
                                        </Link>
                                    </CardActionArea>
                                    <IconButton
                                        color="primary"
                                        aria-label="add to shopping cart"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 16,
                                            right: 16
                                        }}
                                        onClick={() => handleAddToCart(shoe)}
                                    >
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Home
