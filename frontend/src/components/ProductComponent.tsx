import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Breadcrumbs from '@mui/material/Breadcrumbs';

interface Shoe {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const ProductComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shoe, setShoe] = useState<Shoe | null>(null);

  // id som andra argument för att få fetch att köra om varje gång ID ändras
  useEffect(() => {
    axios.get(`http://localhost:8080/api/shoes/${id}`)
      .then(response => {
        setShoe(response.data);
      });
  }, [id]);

  if (!shoe) {
    return <div>Shoe not found</div>;
  }

  return (
    <div>
   <Breadcrumbs aria-label="breadcrumb">
          <Link to={"/"} color="inherit">
          SoleVault
          </Link>
          <Link to={"/shoes"} color="inherit">
          Alla Skor
          </Link>
          <Typography color="text.primary">{shoe.name}</Typography>
        </Breadcrumbs>


    <CardMedia
      component="img"
      height="400"
      image={shoe.image}
      alt="green iguana"
    />

      <Typography gutterBottom variant="h5" component="div">
        {shoe.name}
      </Typography>

      <Typography gutterBottom variant="h5" component="div">
        {shoe.price} kr
      </Typography>
      <Rating name="half-rating-read" defaultValue={shoe.rating} precision={0.5} readOnly />

    </div>
  );
};

export default ProductComponent;
