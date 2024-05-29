const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
import { Request, Response } from "express";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Definierar interface för skorna
interface Shoe {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

// Skapar databas, körs direkt så ändringar kan göras i realtid
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`CREATE TABLE shoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    rating REAL,
    image TEXT
  )`);

  // Placeholder bilder
  db.run(`INSERT INTO shoes (name, price, rating, image) VALUES
    ('Sneaker 1', 799, 2.5, 'https://www.pngall.com/wp-content/uploads/2/White-Sneakers-PNG-Clipart.png'),
    ('Sneaker 2', 1249, 3.5, 'https://www.pngall.com/wp-content/uploads/2/White-Sneakers-PNG-Clipart.png'),
    ('Sneaker 3', 949, 4.5, 'https://www.pngall.com/wp-content/uploads/2/White-Sneakers-PNG-Clipart.png')
  `);
});

// Endpoint för att hämta alla skor
app.get("/api/shoes", (req: Request, res: Response) => {
  db.all("SELECT * FROM shoes", (err: Error, rows: Shoe[]) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Endpoint för att hämta en specific sko vi addressparameter
app.get("/api/shoes/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  db.get("SELECT * FROM shoes WHERE id = ?", [id], (err: Error, row: Shoe) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    } else {
      res.json(row);
    }
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
