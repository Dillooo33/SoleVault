import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Container,
    IconButton,
    Select,
    MenuItem,
    Typography,
    TextField
} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

interface CartItem {
    id: number
    name: string
    size: string
    color: string
    quantity: number
    price: number
    image: string
}

interface CartSummary {
    total: number
    shipping: number
}

const Cart: React.FC = () => {
    const [items, setItems] = useState<CartItem[]>([])
    const [summary, setSummary] = useState<CartSummary>({
        total: 0,
        shipping: 0
    })

    useEffect(() => {
        axios
            .get('http://localhost:8080/cart')
            .then((response) => {
                setItems(response.data.items)
                setSummary(response.data.summary)
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the cart data!',
                    error
                )
            })
    }, [])

    const handleUpdateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveFromCart(id)
        } else {
            axios
                .put(`http://localhost:8080/cart/${id}`, { quantity })
                .then(() => {
                    setItems((prevItems) =>
                        prevItems.map((item) =>
                            item.id === id ? { ...item, quantity } : item
                        )
                    )
                })
                .catch((error) => {
                    console.error(
                        'There was an error updating the quantity!',
                        error
                    )
                })
        }
    }

    const handleRemoveFromCart = (id: number) => {
        axios
            .delete(`http://localhost:8080/cart/${id}`)
            .then(() => {
                setItems((prevItems) =>
                    prevItems.filter((item) => item.id !== id)
                )
            })
            .catch((error) => {
                console.error('There was an error removing the item!', error)
            })
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Varukorg
            </Typography>
            {items.map((item) => (
                <Box
                    key={item.id}
                    display="flex"
                    mb={2}
                    borderBottom={1}
                    pb={2}
                    alignItems="center"
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 80, height: 80 }}
                    />
                    <Box ml={2} flexGrow={1}>
                        <Typography variant="h6">{item.name}</Typography>
                        <Box display="flex" mt={1}>
                            <Select value={item.size} disabled>
                                <MenuItem value={item.size}>
                                    Storlek: {item.size}
                                </MenuItem>
                            </Select>
                            <Select value={item.color} disabled>
                                <MenuItem value={item.color}>
                                    Färg: {item.color}
                                </MenuItem>
                            </Select>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                            <IconButton
                                onClick={() =>
                                    handleUpdateQuantity(
                                        item.id,
                                        item.quantity - 1
                                    )
                                }
                                disabled={item.quantity === 1}
                            >
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Typography>{item.quantity}</Typography>
                            <IconButton
                                onClick={() =>
                                    handleUpdateQuantity(
                                        item.id,
                                        item.quantity + 1
                                    )
                                }
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                            <Button
                                startIcon={<DeleteIcon />}
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemoveFromCart(item.id)}
                                sx={{ ml: 2 }}
                            >
                                Ta Bort
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ))}
            <Box mt={2}>
                <Box mb={2}>
                    <TextField
                        label="Har du en rabattkod?"
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Presentkort?"
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography>Frakt:</Typography>
                    <Typography>SEK {summary.shipping}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">TOTAL:</Typography>
                    <Typography variant="h6">SEK {summary.total}</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        backgroundColor: '#57C7E5',
                        color: 'black',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                    }}
                >
                    Fortsätt
                </Button>
                <Box mt={2}>
                    <Typography>✔ 30 dagars öppet köp</Typography>
                    <Typography>✔ Fri frakt på order över 500:-</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default Cart
