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
  image: string;
}

// Skapar databas, körs direkt så ändringar kan göras i realtid
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`CREATE TABLE shoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    image TEXT
  )`);

  // Placeholder bilder
  db.run(`INSERT INTO shoes (name, price, image) VALUES
    ('Sneaker 1', 799, 'https://via.placeholder.com/150'),
    ('Sneaker 2', 1249, 'https://via.placeholder.com/150'),
    ('Sneaker 3', 949, 'https://via.placeholder.com/150')
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
