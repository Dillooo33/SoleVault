import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Box, Select, MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

interface Shoe {
    id: number
    name: string
    price: number
    rating: number
    image: string
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
    }

    if (!shoe) {
        return <div>Shoe not found</div>
    }

    return (
        <div>
            <Box sx={{ padding: 4 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to={'/'} color="inherit">
                        SoleVault
                    </Link>
                    <Link to={'/shoes'} color="inherit">
                        Alla Skor
                    </Link>
                    <Typography color="text.primary">{shoe.name}</Typography>
                </Breadcrumbs>

                <CardMedia
                    component="img"
                    height="400"
                    image={shoe.image}
                    alt={shoe.name}
                    sx={{ objectFit: 'contain' }}
                />

                <Typography gutterBottom variant="h5" component="div">
                    {shoe.name}
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                    {shoe.price} kr
                </Typography>

                <Typography gutterBottom variant="h6" component="div">
                    {/* Ändra denna sen så att färgen matchar med skorna */}
                    Färg: Vit
                </Typography>

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
            </Box>
        </div>
    )
}

export default ProductComponent
