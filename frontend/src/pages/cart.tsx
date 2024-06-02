import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Container,
    IconButton,
    Select,
    MenuItem,
    Typography,
    TextField,
    Divider,
    Link,
    Grid
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
        fetchCartData()
    }, [])

    //Denna funktion gör så att total priset uppdateras dynamiskt på sidan om man tycker på + eller - knapparna eller om man trycker på ta bort-knappen använder sen denna funktion i handleUpdateQuantity och i handleRemoveFromCart så att den vet vart den ska användas
    const fetchCartData = () => {
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
    }

    //Funktionen gör bara så att om man trycker på + knappen så ökar den antalet av den varan trycker man på - knappen minskar den antalet av den varan
    const handleUpdateQuantity = (id: number, quantity: number) => {
        axios
            .put(`http://localhost:8080/cart/${id}`, { quantity })
            .then(() => {
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    )
                )
                fetchCartData()
            })
            .catch((error) => {
                console.error(
                    'There was an error updating the quantity!',
                    error
                )
            })
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
        fetchCartData()
    }

    return (
        <Container>
            <Box textAlign="center" marginBottom={3} marginTop={3}>
                <Typography variant="h4" gutterBottom>
                    Varukorg
                </Typography>
                <Typography variant="body1">
                    Varor: {items.reduce((sum, item) => sum + item.quantity, 0)}
                </Typography>
            </Box>
            <Divider />
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {items.map((item) => (
                        <Box
                            key={item.id}
                            display="flex"
                            marginBottom={2}
                            marginTop={2}
                            paddingBottom={2}
                            alignItems="center"
                            justifyContent="space-between"
                            borderBottom="1px solid #e0e0e0"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: 'cover'
                                }}
                            />
                            <Box
                                marginLeft={2}
                                flexGrow={1}
                                display={'flex'}
                                flexDirection={'column'}
                            >
                                <Typography variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography variant="subtitle1">
                                    SEK {item.price}
                                </Typography>
                                <Box display="flex" marginTop={1} gap={1}>
                                    {/* Select för färg och storlek är disabled för tillfället tills att vi fixar så att det finns olika och välja mellan */}
                                    <Select
                                        value={item.size}
                                        disabled
                                        size="small"
                                    >
                                        <MenuItem value={item.size}>
                                            Storlek: {item.size}
                                        </MenuItem>
                                    </Select>
                                    <Select
                                        value={item.color}
                                        disabled
                                        size="small"
                                    >
                                        <MenuItem value={item.color}>
                                            Färg: {item.color}
                                        </MenuItem>
                                    </Select>
                                </Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    marginTop={1}
                                >
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
                                        color="error"
                                        onClick={() =>
                                            handleRemoveFromCart(item.id)
                                        }
                                        sx={{ marginLeft: 2 }}
                                    >
                                        Ta Bort
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    <Box display="flex" marginTop={1}>
                        <Typography>
                            Gratis upphämtning i butik&nbsp;
                        </Typography>
                        <Link href="#" underline="always">
                            Hitta butik
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box marginTop={2}>
                        <Box marginBottom={2}>
                            <TextField
                                label="Har du en rabattkod?"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                label="Presentkort?"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            marginBottom={2}
                            marginTop={5}
                        >
                            <Typography>Frakt:</Typography>
                            <Typography>SEK {summary.shipping}</Typography>
                        </Box>
                        <Divider />
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            marginBottom={2}
                        >
                            <Typography variant="h6">TOTAL:</Typography>
                            <Typography variant="h6">
                                SEK {summary.total}
                            </Typography>
                        </Box>
                        <Divider />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                backgroundColor: '#57C7E5',
                                color: 'black',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                marginBottom: 2,
                                marginTop: 3
                            }}
                        >
                            Fortsätt
                        </Button>
                        <Box
                            marginTop={2}
                            marginBottom={2}
                            textAlign={'center'}
                        >
                            <Typography>✔ 30 dagars öppet köp</Typography>
                            <Typography>
                                ✔ Fri frakt på order över 899:-
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Cart
