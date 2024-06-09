import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    Box,
    Select,
    MenuItem,
    Typography,
    Button,
    CardMedia,
    Breadcrumbs,
    Rating
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

interface Shoe {
    id: number
    name: string
    price: number
    rating: number
    image: string
    description: string
}

const ProductComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [shoe, setShoe] = useState<Shoe | null>(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/shoes/${id}`).then((response) => {
            setShoe(response.data)
        })
    }, [id])

    const handleAddToCart = () => {
        if (shoe) {
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
                })
                .catch((error) => {
                    console.error(
                        'There was an error adding the item to the cart!',
                        error
                    )
                })
        }
    }

    if (!shoe) {
        return <div>Shoe not found</div>
    }

    return (
        <Box sx={{ paddingX: {xs: 4, lg: 10}, paddingY: 4 }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    to={'/'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    SoleVault
                </Link>
                <Link
                    to={'/shoes'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Alla Skor
                </Link>
                <Typography color="text.primary">{shoe.name}</Typography>
            </Breadcrumbs>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CardMedia
                    component="img"
                    image={shoe.image}
                    alt={shoe.name}
                    sx={{
                        objectFit: 'contain',
                        height: {lg: 300},
                        width: '100%',
                        maxWidth: {lg: 500},
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',

                    }}
                />
            </Box>

            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography gutterBottom variant="h5" component="div">
                    {shoe.name}
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                    {shoe.price} kr{' '}
                </Typography>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography gutterBottom variant="h6" component="div">
                    {/* Ändra denna sen så att färgen matchar med skorna */}
                    Färg: vit
                </Typography>

                <Rating
                    name="read-only"
                    value={shoe.rating}
                    readOnly
                    precision={0.5}
                />
            </Box>

            <Box marginTop={3} marginBottom={4}>
                <Typography variant="body1" component="div" fontWeight={'bold'}>
                    Info:
                </Typography>
                <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    maxWidth={400}
                >
                    {shoe.description}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', py: '1rem' }}>
                <Select
                    defaultValue=""
                    displayEmpty
                    fullWidth
                    sx={{ borderRadius: '50px' }}
                >
                    <MenuItem value="" disabled>
                        Välj storlek
                    </MenuItem>
                    <MenuItem value={38}>38</MenuItem>
                    <MenuItem value={39}>39</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                </Select>
            </Box>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    paddingX: 4,
                    paddingY: 1.5,
                    backgroundColor: '#57C7E5',
                    minWidth: '198px',
                    fontSize: '1rem',
                    color: 'black',
                    textTransform: 'none'
                }}
                onClick={handleAddToCart}
            >
                Lägg till i kundvagnen
                <AddShoppingCartIcon sx={{ marginLeft: 2 }} />
            </Button>

            <Box marginTop={6} textAlign={'center'}>
                <Typography>✔ 30 dagars öppet köp</Typography>
                <Typography>✔ Fri frakt på order över 899:-</Typography>
            </Box>
        </Box>
    )
}

export default ProductComponent
