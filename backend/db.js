
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "database.sqlite");

async function initializeDB() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });


  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      isAdmin BOOLEAN DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      gamefilepath TEXT NOT NULL
    );
  `);


  const admin = await db.get("SELECT * FROM users WHERE email = ?", ["kunalraj.s.patil@gmail.com"]);
  if (!admin) {
    await db.run("INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)", [
      "kunalraj.s.patil@gmail.com",
      "Kunalraj2005",
      1,
    ]);
    console.log("✅ Admin user created.");
  } else {
    console.log("⚠️ Admin user already exists.");
  }

  // Seed games if table is empty
  const gameCount = await db.get("SELECT COUNT(*) as count FROM games");
  if (gameCount.count === 0) {
    await db.run(
      `INSERT INTO games (name, description, image, gamefilepath)
       VALUES (?, ?, ?, ?)`,
      ["Whack-a-Mole", "Test your reflexes at...", "whack-a-mole.jpg", "wamp.html"]
    );
    await db.run(
      `INSERT INTO games (name, description, image, gamefilepath)
       VALUES (?, ?, ?, ?)`,
      ["Tic Tac Toe", "Challenge your friends...", "ttt (1).jpg", "tttprev.html"]
    );
    await db.run(
      `INSERT INTO games (name, description, image, gamefilepath)
       VALUES (?, ?, ?, ?)`,
      ["Rock Paper Scissors", "Play this classical...", "rps (1).jpg", "rpsprev.html"]
    );
    await db.run(
      `INSERT INTO games (name, description, image, gamefilepath)
       VALUES (?, ?, ?, ?)`,
      ["Flappy Bird", "Play this short game....", "fp (1).jpg", "fpprev.html"]
    );
    await db.run(
      `INSERT INTO games (name, description, image, gamefilepath)
       VALUES (?, ?, ?, ?)`,
      ["Doodle Jump", "Doodle jump an interesting game", "DJ.png", "djprev.html"]
    );
    console.log("✅ Sample games inserted.");
  }

  return db;
}

export default initializeDB;
