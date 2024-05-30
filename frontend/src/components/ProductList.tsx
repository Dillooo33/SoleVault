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

interface Shoe {
    id: number
    name: string
    price: number
    rating: number
    image: string
}

const Home: React.FC = () => {
    const [shoes, setShoes] = useState<Shoe[]>([])

    // Starta databasen med npm run dev, i backend mappen.
    // Eftersom att vår get endpoint konverterar vår databas till json så kan vi köra en fetch på själva databasen
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

    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb">
                <Link to={'/'} color="inherit">
                    SoleVault
                </Link>
                <Typography color="text.primary">Alla Skor</Typography>
            </Breadcrumbs>

            <h2>Alla Skor</h2>
            <Grid container spacing={2}>
                {/* Mappar / Renderar ut alla skor i databasen */}
                {shoes.map((shoe) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={shoe.id}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Card
                            sx={{
                                maxWidth: {
                                    xs: 345,
                                    sm: 400,
                                    md: 450,
                                    lg: 500
                                },
                                width: '100%'
                            }}
                        >
                            <CardActionArea>
                                <Link to={`/shoe/${shoe.id}`}>
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
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Home
