import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Box } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
                />

                <Typography gutterBottom variant="h5" component="div">
                    {shoe.name}
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                    {shoe.price} kr
                </Typography>

                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>Beskrivning</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography>Betyg</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Namn: Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
                        </Typography>
                        <Rating
                            name="half-rating-read"
                            defaultValue={shoe.rating}
                            precision={0.5}
                            readOnly
                        />

                        <Typography>
                            Namn: Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
                        </Typography>
                        <Rating
                            name="half-rating-read"
                            defaultValue={shoe.rating}
                            precision={0.5}
                            readOnly
                        />

                        <Typography>
                            Namn: Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
                        </Typography>
                        <Rating
                            name="half-rating-read"
                            defaultValue={shoe.rating}
                            precision={0.5}
                            readOnly
                        />
                    </AccordionDetails>
                </Accordion>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        paddingX: 4,
                        paddingY: 1.5,
                        backgroundColor: '#57C7E5',
                        minWidth: '198px',
                        fontSize: '1rem',
                        color: 'black'
                    }}
                    onClick={handleAddToCart}
                >
                    Lägg till i kundvagnen
                    <AddShoppingCartIcon />
                </Button>
            </Box>
        </div>
    )
}

export default ProductComponent
