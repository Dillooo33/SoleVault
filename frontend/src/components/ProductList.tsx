import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Rating from '@mui/material/Rating'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Box from '@mui/material/Box' // Ensure Box is imported

interface Shoe {
    id: number
    name: string
    price: number
    rating: number
    image: string
}

const Home: React.FC = () => {
    const [shoes, setShoes] = useState<Shoe[]>([])
    const [filter, setFilter] = useState<string>('id')

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/shoes?order=${filter}`)
            .then((response) => {
                setShoes(response.data)
            })
            .catch((error) => {
                console.error('Fel vid hämtning av skorna!', error)
            })
    }, [filter])

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilter(event.target.value)
    }

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
        <div className="container">
            <Box sx={{ padding: 4 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        to={'/'}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        SoleVault
                    </Link>
                    <Typography color="text.primary">Alla Skor</Typography>
                </Breadcrumbs>

                <h2 style={{ padding: '0 16px' }}>Alla Skor</h2>

                <FormControl
                    variant="outlined"
                    style={{
                        marginBottom: '20px',
                        minWidth: 200,
                        padding: '0 16px'
                    }}
                >
                    <InputLabel>Sortera efter</InputLabel>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                        label="Sortera efter"
                    >
                        <MenuItem value="id">Relevans</MenuItem>
                        <MenuItem value="rating DESC">Betyg</MenuItem>
                        <MenuItem value="price ASC">Pris: ökande</MenuItem>
                        <MenuItem value="price DESC">Pris: fallande</MenuItem>
                        <MenuItem value="name ASC">Namn: A-Ö</MenuItem>
                        <MenuItem value="name DESC">Namn: Ö-A</MenuItem>
                    </Select>
                </FormControl>

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
                                    position: 'relative' // Added to position the IconButton
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
                                            height="140"
                                            image={shoe.image}
                                            alt={shoe.name}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                style={{ fontSize: '1.5rem' }}
                                            >
                                                {shoe.name}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                component="div"
                                                style={{ fontSize: '1.25rem' }}
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
        </div>
    )
}

export default Home
