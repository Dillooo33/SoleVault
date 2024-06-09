"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
// Skapar databas, körs direkt så ändringar kan göras i realtid
const db = new sqlite3.Database(":memory:");
db.serialize(() => {
    db.run(`CREATE TABLE shoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    rating REAL,
    featured BOOLEAN,
    image TEXT,
    description TEXT
  )`);
    db.run(`CREATE TABLE cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        size TEXT,
        color TEXT,
        quantity INTEGER,
        price REAL)`);
    // Placeholder bilder
    db.run(`INSERT INTO shoes (name, price, rating, featured, image, description) VALUES
  ('Blaze', 1384, 4.8, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Trail', 1426, 4.5, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Nexus', 1216, 4.1, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Fury', 1421, 4.7, true, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Fusion', 966, 4.9, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Rage', 965, 4.4, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Jordan', 1391, 3.0, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Pace', 685, 4.6, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Phantom', 1129, 2.7, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Pulse', 830, 4.5, true, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Comfort', 1404, 4.8, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Bolt', 717, 4.3, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Rebel', 1063, 4.5, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Inferno', 687, 2.1, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Wave', 804, 1.2, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Jolt', 1111, 4.4, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Zephyr', 784, 4.0, true, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Echo', 1108, 4.0, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Quake', 1034, 2.3, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Glide', 1035, 3.8, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Raptor', 1385, 4.8, true, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Yeezy', 705, 2.9, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Vibe', 831, 3.6, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Grit', 1117, 1.9, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Surge', 632, 3.9, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Vortex', 898, 4.8, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Titan', 916, 3.8, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Classic', 953, 5.0, true, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Zoom', 766, 4.1, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Maverick', 977, 4.7, false, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.'),
('Sport', 1155, 4.5, true, 'https://i.imgur.com/UafnMij.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum, nulla feugiat ultrices ullamcorper, ex ante ultrices neque, sit amet pharetra sapien purus vitae neque. Aliquam ac dictum est.')`);
});
// Endpoint för att hämta alla skor, med sök och filter funktionalitet
app.get("/api/shoes", (req, res) => {
    const search = req.query.name ? `%${req.query.name}%` : "%";
    const filter = req.query.order
        ? req.query.order.toString().toLowerCase()
        : "id";
    db.all(`SELECT * FROM shoes WHERE name LIKE ? ORDER BY ${filter}`, [search], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.json(rows);
        }
    });
});
// Endpoint för utvalda / populära skor
app.get("/api/featured", (req, res) => {
    db.all("SELECT * FROM shoes WHERE featured = TRUE", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.json(rows);
        }
    });
});
// Endpoint för att hämta en specific sko vi addressparameter
app.get("/api/shoes/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM shoes WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
        else {
            res.json(row);
        }
    });
});
//endpoint kundvagn
app.get("/cart", (req, res) => {
    db.all(`SELECT cart_items.*, shoes.image
          FROM cart_items
          JOIN shoes ON cart_items.name = shoes.name`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        const total = rows.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = total > 899 ? 0 : 50;
        const summary = {
            total,
            shipping,
        };
        res.json({ items: rows, summary });
    });
});
app.post("/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, size, color, quantity, price } = req.body;
    const sqlInsert = "INSERT INTO cart_items (name, size, color, quantity, price) VALUES (?, ?, ?, ?, ?)";
    const params = [name, size, color, quantity, price];
    const insertItem = (sql, params) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    const getLastInsertId = () => {
        return new Promise((resolve, reject) => {
            db.get("SELECT last_insert_rowid() as id", [], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row.id);
                }
            });
        });
    };
    try {
        yield insertItem(sqlInsert, params);
        const lastID = yield getLastInsertId();
        res.status(201).json({ id: lastID });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
// Uppdatera kvantitet av ett objekt om det redan finns i kundvagnen
app.put("/cart/:id", (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;
    db.run("UPDATE cart_items SET quantity = ? WHERE id = ?", [quantity, id], function (err) {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            db.get("SELECT changes() AS changes", (err, row) => {
                if (err) {
                    res.status(500).send(err.message);
                }
                else if (row.changes === 0) {
                    res.status(404).send("Item not found");
                }
                else {
                    res.status(200).send("Quantity updated successfully");
                }
            });
        }
    });
});
// Ta bort ett objekt från kundvagnen
app.delete("/cart/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM cart_items WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            db.get("SELECT changes() AS changes", (err, row) => {
                if (err) {
                    res.status(500).send(err.message);
                }
                else if (row.changes === 0) {
                    res.status(404).send("Item not found");
                }
                else {
                    res.status(200).send("Item deleted successfully");
                }
            });
        }
    });
});
//Endpoint för antal varor i kundvagnen
app.get("/cart/count", (req, res) => {
    db.get("SELECT SUM(quantity) as count FROM cart_items", (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.json({ count: row.count || 0 });
        }
    });
});
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
