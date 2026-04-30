# Job Application Tracker

Job Application Tracker is a React web application designed to help users organise, monitor and analyse their job search process.

The app allows users to save job applications, track their status, add notes and feedback, search and filter applications, view dashboard statistics, visualise application status data and export records to CSV.

## Live Demo

Coming soon.

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

```text
(Interviews + Offers) / Total Applications * 100