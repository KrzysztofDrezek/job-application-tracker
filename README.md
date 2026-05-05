Job Application Tracker

A full-stack web application designed to organise and analyse the job search process.

The app allows users to track job applications, monitor progress, analyse outcomes and manage all relevant information in one place — without relying on spreadsheets.

Live Demo

Frontend: https://job-application-tracker-one-omega.vercel.app

Backend API (live): https://job-application-tracker-geyv.onrender.com/api/applications

Overview

Managing multiple job applications can quickly become overwhelming. This project solves that problem by providing a clean interface with filtering, search, analytics and data visualisation.

The application combines frontend development with backend API integration and database persistence, focusing on usability and real-world value.

Features
Add, edit and delete job applications (CRUD)
Persistent data storage using a database
Track application status: Applied, Interview, Rejected, Offer
Search by company, role, notes or feedback
Filter applications by status
Sort applications by date, company and status
Dashboard metrics: total applications, interviews, rejections, offers and response rate
Data visualisation: applications by status and applications over time
Export data to CSV
Fully responsive layout
Tech Stack

Frontend:

React
Vite
JavaScript
CSS
Recharts

Backend:

Node.js
Express
SQLite
API Endpoints
GET /api/applications
POST /api/applications
PUT /api/applications/:id
DELETE /api/applications/:id
Deployment

Frontend is deployed on Vercel.
Backend API is deployed on Render.

The application uses a full-stack architecture with a remote API and database.

Data & Analytics

The application includes basic analytics to help users understand their job search performance.

Response rate calculation:

(Interviews + Offers) / Total Applications * 100

The applications over time chart provides insight into activity trends and consistency of job applications.

Installation

Clone the repository:

git clone https://github.com/KrzysztofDrezek/job-application-tracker.git

Navigate to the project folder:

cd job-application-tracker

Install dependencies:

npm install

Running the Application

Start backend:

npm run server:dev

Backend runs on:

http://localhost:5000

Start frontend in a separate terminal:

npm run dev

Frontend runs on:

http://localhost:5173

Data Storage

This version uses a SQLite database through a Node.js and Express backend.

Data is persisted on the server, allowing full CRUD operations across sessions.

Note: On the free Render plan, the service may spin down when inactive and data persistence may be limited.

Future Improvements
User authentication (login and registration)
Advanced analytics
Additional status types such as Assessment and No Response
Backend-based CSV or PDF export
Dark mode
Migration to a production-ready database (e.g. PostgreSQL)
What I Learned
Building a full-stack application with React, Express and SQLite
Designing and implementing REST API endpoints
Managing data persistence in a relational database
Connecting frontend to backend using HTTP requests
Implementing CRUD operations across the full stack
Creating dashboard analytics and data visualisation
Structuring a project for real-world use
Author

Krzysztof Drezek
GitHub: https://github.com/KrzysztofDrezek