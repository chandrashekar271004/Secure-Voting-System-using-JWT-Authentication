🗳️ Secure Voting System (MERN + JWT)

A full-stack secure voting application built using React, Node.js, Express, MongoDB, and JWT Authentication.

---

FEATURES

User:
- Register with username, voter ID, password
- Login with JWT authentication
- Vote only once
- Cannot vote again after voting

Admin:
- Admin login (admin123 / admin123)
- Cannot vote
- View live vote results
- View vote percentage
- View winner or tie
- Real-time updates

---

AUTHENTICATION

- JWT-based authentication
- Protected routes
- Role-based access control

---

TECH STACK

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- Charts: Chart.js

---

PROJECT STRUCTURE

- backend/ → API & database logic  
- frontend/ → React UI  

---

SETUP INSTRUCTIONS

Clone Repository

git clone https://github.com/chandrashekar271004/Secure-Voting-System-using-JWT-Authentication.git  
cd Secure-Voting-System-using-JWT-Authentication  

Backend Setup

cd backend  
npm install  

Create .env file:

MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  

Run backend:

node server.js  

Frontend Setup

cd frontend  
npm install  
npm start  

---

URLS

Frontend: http://localhost:3000  
Backend: http://localhost:5000  

---

ADMIN LOGIN

Voter ID: admin123  
Password: admin123  

---

WHY THIS PROJECT

- Easy to run and test
- Demonstrates full-stack development
- Shows JWT authentication and role-based access
- Useful for learning and portfolio

---

FUTURE IMPROVEMENTS

- Election start/stop system  
- Better UI  
- Email verification  
- Use HTTP-only cookies  

---

AUTHOR

Chandrashekar