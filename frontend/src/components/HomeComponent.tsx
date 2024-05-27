// Copy paste av ProductComponent fast med an Hero image, med andra ord en Placeholder
// Ska göras om så endast utvalda produkter visas

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from './HeroComponent'

interface Shoe {
  id: number;
  name: string;
  price: number;
  image: string;
}

const HomePage: React.FC = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/shoes')
      .then(response => {
        setShoes(response.data);
      })
      .catch(error => {
        console.error('Fel vid hämtning av skorna!', error);
      });
  }, []);

  return (
    <div className="container">
    <Hero></Hero>
      <h2>Populära Skor</h2>
      <h2><Link to={"/shoes"}>Alla Skor</Link></h2>
      <div className="shoe-list">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="shoe-card">
            <Link to={`/shoe/${shoe.id}`}>
              <img src={shoe.image} alt={shoe.name} className="shoe-image" />
              <h3 className="shoe-name">{shoe.name}</h3>
              <p className="shoe-price">{shoe.price} Kr</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
