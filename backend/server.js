
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import initializeDB from "./db.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "frontend")));

let db;
initializeDB().then((database) => {
  db = database;
  console.log("✅ Database initialized.");
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "wpoefm.html"));
});


app.get("/games", async (req, res) => {
  try {
    const games = await db.all("SELECT * FROM games");
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games." });
  }
});


app.delete("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.run("DELETE FROM games WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete game." });
  }
});


app.post("/games", async (req, res) => {
  const { name, description, image, gamefilepath } = req.body;
  if (!name || !description || !image || !gamefilepath) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await db.run(
      "INSERT INTO games (name, description, image, gamefilepath) VALUES (?, ?, ?, ?)",
      [name, description, image, gamefilepath]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add game." });
  }
});


app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (user) return res.status(409).json({ message: "User already exists" });

    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
      if (user && user.password === password) {
        res.json({
          status: "success",
          message: "Login successful",
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      res.status(500).json({ error: "Login failed" });
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
