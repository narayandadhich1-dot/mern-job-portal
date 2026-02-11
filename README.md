MERN Job Portal

This is a full-stack Job Portal web application built using the MERN stack.
The project is created for learning purposes and to demonstrate how a real job portal works with authentication, roles, and CRUD operations.

The app supports students and recruiters with different features for each role.

Tech Stack

Frontend

React
Redux Toolkit
Axios
Tailwind CSS
Shadcn/ui

Backend

Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Multer (file upload)



Features


Authentication
User signup and login
JWT based authentication
Role based access (Student / Recruiter)
Student
Register and login
View job listings
Apply for jobs
Update profile
Recruiter
Register and login
Create company profile
Post jobs
View applications

Folder Structure
mern-job-portal/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── index.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── main.jsx

Environment Variables

Create a .env file inside the backend folder:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Installation & Setup
1. Clone the repository
git clone https://github.com/narayandadhich1-dot/mern-job-portal.git

2. Backend setup
cd backend
npm install
npm run dev

3. Frontend setup
cd frontend
npm install
npm run dev

Status

This project is still under development.
More features and improvements will be added.

Purpose

This project is built to:

Practice MERN stack development

Understand authentication and role based access

Create a strong portfolio project