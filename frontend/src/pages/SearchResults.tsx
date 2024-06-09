import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Rating from '@mui/material/Rating'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'

interface Shoe {
    id: number
    name: string
    price: number
    rating: number
    image: string
}

interface CartItem {
    id: number;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
}

const SearchResults: React.FC = () => {
    const location = useLocation()
    const searchQuery = new URLSearchParams(location.search).get('query')
    const [searchResults, setSearchResults] = useState<Shoe[]>([])
    const [inCart, setInCart] = useState<{ [key: number]: boolean }>({})

    useEffect(() => {
        if (searchQuery) {
            axios
                .get(`http://localhost:8080/api/shoes?name=${searchQuery}&order=name`)
                .then((response) => setSearchResults(response.data))
                .catch((error) => console.error('Error fetching search results:', error))
        }

        axios
            .get('http://localhost:8080/cart')
            .then((response) => {
                const cartItems = response.data.items
                const inCartMap: { [key: number]: boolean } = {}
                cartItems.forEach((item: CartItem) => {
                    inCartMap[item.id] = true
                })
                setInCart(inCartMap)
            })
            .catch((error) => console.error('Error fetching cart items!', error))
    }, [searchQuery])

    const handleAddToCart = (shoe: Shoe) => {
        axios
            .post('http://localhost:8080/cart', {
                name: shoe.name,
                size: '40',
                color: 'Black',
                quantity: 1,
                price: shoe.price
            })
            .then((response) => {
                console.log('Item added to cart:', response.data)
                setInCart((prevInCart) => ({ ...prevInCart, [shoe.id]: true }))
            })
            .catch((error) => console.error('There was an error adding the item to the cart!', error))
    }

    return (
        <div className="container">
            <Box sx={{ padding: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        to={'/'}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        SoleVault
                    </Link>
                    <Typography color="text.primary">Sökresultat för "{searchQuery}"</Typography>
                </Breadcrumbs>

                <h2 style={{ padding: '0 16px' }}>Sökresultat för "{searchQuery}"</h2>

                <Grid container spacing={4}>
                    {searchResults.map((shoe) => (
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
                                    disabled={inCart[shoe.id]}
                                >
                                    {inCart[shoe.id] ? (
                                        <CheckCircleIcon />
                                    ) : (
                                        <AddShoppingCartIcon />
                                    )}
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default SearchResults
