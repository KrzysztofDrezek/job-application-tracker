# Job Application Tracker

Job Application Tracker is a React web application designed to help users organise, monitor and analyse their job search process.

The app allows users to save job applications, track their status, add notes and feedback, search and filter applications, view dashboard statistics, visualise application status data and export records to CSV.

## Live Demo

https://job-application-tracker-one-omega.vercel.app

## Project Purpose

This project was built to solve a real problem: keeping track of multiple job applications during an active job search.

Instead of using a spreadsheet, the application provides a cleaner interface with dashboard analytics, filtering, search and export functionality.

The project also demonstrates frontend development, state management, data persistence and basic data analysis in a practical context.

## Features

- Add new job applications
- Edit existing applications
- Delete applications
- Save data in localStorage
- Filter applications by status
- Search by company, role, notes or feedback
- Track application status:
  - Applied
  - Interview
  - Rejected
  - Offer
- View dashboard statistics
- Calculate response rate
- Display applications by status using a chart
- Export application data to CSV
- Responsive layout for desktop and mobile

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Recharts
- localStorage
- CSV export

## Dashboard Metrics

The dashboard includes:

- Total Applications
- Interviews
- Rejected Applications
- Offers
- Response Rate

The response rate is calculated as:

(Interviews + Offers) / Total Applications * 100

This gives users a simple way to understand how many applications moved beyond the initial applied stage.

## Screenshots

Screenshots will be added after deployment.

## Installation

Clone the repository:

git clone https://github.com/KrzysztofDrezek/job-application-tracker.git

Go into the project folder:

cd job-application-tracker

Install dependencies:

npm install

Run the development server:

npm run dev

Open the local development link in your browser.

Usually:

http://localhost:5173/

## Available Scripts

Run the app locally:

npm run dev

Create a production build:

npm run build

Preview the production build:

npm run preview

## Data Storage

This version uses browser localStorage.

This means application data is saved in the user's browser and remains available after refreshing or reopening the page.

Future versions could include a backend database using Node.js, Express and SQLite.

## Project Structure

job-application-tracker
- public
- src
  - App.jsx
  - App.css
  - main.jsx
- package.json
- vite.config.js
- README.md

## Future Improvements

Planned improvements include:

- Backend API with Node.js and Express
- SQLite database storage
- User authentication
- More detailed analytics
- Applications over time chart
- Dark mode
- Deployment to Vercel or Netlify

## What I Learned

During this project, I practised:

- Building a React application with state management
- Managing form data
- Adding, editing and deleting records
- Persisting data with localStorage
- Creating search and filter functionality
- Calculating dashboard metrics
- Displaying chart data with Recharts
- Exporting structured data to CSV
- Improving UI for portfolio presentation

## Author

Krzysztof Drezek

GitHub: https://github.com/KrzysztofDrezek
