# 🎮 ArcadeVerse

**ArcadeVerse** is a full-stack web application that serves as a game hub platform. Users can register, log in, and play various mini-games directly in their browser. Admins have special privileges to manage the game library dynamically using a JSON backend.

## 🚀 Features

- 🧑‍💻 User Authentication (Register/Login)
- 🕹️ Play a collection of mini-games (e.g., Flappy Bird, Car Game)
- 🧩 Game preview with authentication check
- 🔐 Protected Routes (Login required to play)
- 🛠️ Admin dashboard with:
  - Game deletion
  - Dynamic game addition form after deletion
- 🎨 Dark themed UI with red accent, styled using Bootstrap and custom CSS
- 🗃️ SQLite database with Express backend
- 📦 JSON server integration for game management
- 🔄 Dynamic frontend using vanilla JS

## 🏗️ Tech Stack

**Frontend**  
- HTML5, CSS3, Bootstrap  
- Vanilla JavaScript  

**Backend**  
- Node.js with Express.js (ES modules)  
- SQLite3 database  
- JSON server for managing game data  

**Other Tools**  
- EJS (for other pages/views as needed)  
- LocalStorage for auth-based redirect handling  

## 🔧 Setup Instructions

### Prerequisites
- Node.js and npm installed
- JSON Server (optional for local dynamic game DB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/arcadeverse.git
   cd arcadeverse
