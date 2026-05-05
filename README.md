# Job Application Tracker

A React web application designed to organise and analyse the job search process.

The app allows users to track job applications, monitor progress, analyse outcomes and manage all relevant information in one place — without relying on spreadsheets.

## Live Demo

https://job-application-tracker-one-omega.vercel.app

## Overview

Managing multiple job applications can quickly become overwhelming. This project solves that problem by providing a clean interface with filtering, search, analytics and data visualisation.

The application combines frontend development with practical data analysis, focusing on usability and real-world value.

## Features

- Add, edit and delete job applications (CRUD)
- Store data in browser localStorage
- Track application status:
  - Applied
  - Interview
  - Rejected
  - Offer
- Search by company, role, notes or feedback
- Filter applications by status
- Sort applications by:
  - Date (newest / oldest)
  - Company (A–Z)
  - Status
- Dashboard metrics:
  - Total applications
  - Interviews
  - Rejections
  - Offers
  - Response rate
- Data visualisation:
  - Applications by status (Pie Chart)
  - Applications over time (Bar Chart)
- Export data to CSV
- Fully responsive layout

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Recharts
- localStorage

## Data & Analytics

The application includes basic analytics to help users understand their job search performance.

Response rate is calculated as:

(Interviews + Offers) / Total Applications * 100

The "Applications over time" chart provides insight into activity trends and consistency of job applications.

## Installation

Clone the repository:

git clone https://github.com/KrzysztofDrezek/job-application-tracker.git

Navigate to the project folder:

cd job-application-tracker

Install dependencies:

npm install

Run the development server:

npm run dev

Open in browser:

http://localhost:5173/

## Scripts

- `npm run dev` — run development server
- `npm run build` — build production version
- `npm run preview` — preview production build

## Data Storage

This version uses browser localStorage, meaning all data is stored locally in the user's browser.

For larger-scale applications, this could be extended with a backend (Node.js, Express, SQLite).

## Future Improvements

- Backend API (Node.js + Express)
- Database integration (SQLite)
- User authentication
- Advanced analytics (trends, ratios, time-based insights)
- Additional status types (e.g. Assessment, No Response)
- Dark mode

## What I Learned

- Building a full React application with state management
- Handling form data and user interactions
- Implementing search, filtering and sorting logic
- Persisting data with localStorage
- Creating dashboard metrics and analytics
- Working with Recharts for data visualisation
- Exporting structured data to CSV
- Designing a user-focused interface for a real problem

## Author

Krzysztof Drezek  
GitHub: https://github.com/KrzysztofDrezek