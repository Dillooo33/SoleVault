import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Shoe {
  id: number;
  name: string;
  price: number;
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
      <img src={shoe.image} alt={shoe.name}/>
      <h2>{shoe.name}</h2>
      <p>{shoe.price} Kr</p>
    </div>
  );
};

export default ProductComponent;
