import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from './HeroComponent';
import { Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


interface Shoe {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const HomePage: React.FC = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/featured')
      .then(response => {
        setShoes(response.data);
      })
      .catch(error => {
        console.error('Fel vid hämtning av skorna!', error);
      });
  }, []);

  return (
    <div className="container">
      <Hero />
      <Box sx={{ padding: 4 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }}>
        <Grid item>
          <h2>Populära Skor</h2>
        </Grid>
        <Grid item>
          <Link to={"/shoes"} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: 'bold',
                borderRadius: '50px',
                paddingX: 4,
                paddingY: 1.5,
                backgroundColor: '#1B3445',
                minWidth: '198px',
                fontSize: '1rem'
              }}
            >
              Alla Skor
            </Button>
          </Link>
        </Grid>
      </Grid>

      {/* Lägger till divider som gör det tydligare att urskilja olika delar  */}
      <Box sx={{ paddingBottom: '16px' }}>
        <Divider />
      </Box>

      <Grid container spacing={4}>
          {shoes.map((shoe) => (
            <Grid item xs={12} sm={6} md={4} key={shoe.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{
                maxWidth: { xs: 345, sm: 400, md: 450, lg: 500 },
                width: '100%',
                position: 'relative' // Added to position the IconButton
              }}>
                <CardActionArea style={{ textDecoration: 'none' }}>
                  <Link to={`/shoe/${shoe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={shoe.image}
                      alt={shoe.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '1.5rem' }}>
                        {shoe.name}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1" component="div" style={{ fontSize: '1.25rem' }}>
                        {shoe.price} kr
                      </Typography>
                      <Rating name="half-rating-read" defaultValue={shoe.rating} precision={0.5} readOnly />
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
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Box>
    </div>
  );
};

export default HomePage;
