Spring '25 Software Engineering Capstone Application
Collaborators: Gabe, Joab, and Jack
Project Overview

Maintenance-Man is a tracker-style web application aimed at organizing DIY car maintenance records.

    Frontend: Vite + React (with TypeScript)
    Backend: ASP.NET
    Future Database Implementation: PostgreSQL or MongoDB

Configuration Steps
Step 1: Install an IDE

Choose one of the following IDEs for working with the C# backend:

    Visual Studio 2022 (Recommended)
    JetBrains Rider (Lightweight alternative)

Step 2: Accept GitHub Invitation & Clone the Repository

    Accept the invitation for the "Maintenance-Man" repository (the old "Maintenance-Manager" repo will be deleted).
    Install Git (if not installed): Git for Windows
    Set up your Git user profile: GitHub Docs
    Clone the repository:

git clone https://github.com/YOUR_USER_NAME_HERE/Maintenance-Man.git

Navigate into the project directory:

    cd Maintenance-Man

Step 3: Install Node.js & npm

    Download and install Node.js (includes npm).
    Verify installation:

    node -v  # Check Node.js version (should be v22.XX.X)
    npm -v   # Check npm version (should be v11.X.X)

Note: The React app is already set up in the repo. Just ensure your Node.js and npm versions match.
Step 4: Verify Installation & Run the Project
Frontend (React + Vite)

    Navigate to the client directory:

cd client

Install dependencies:

npm install  # Required only for initial setup

Start the development server:

    npm run dev

    Click the localhost URL to verify that the app is running.
    To stop the server, press q + Enter in PowerShell/CMD.

Backend (ASP.NET)

    Open your IDE (Visual Studio or Rider).
    Open the "api" folder in the project directory.
    Press Run (green play button) to start the backend.
    If successful, it will launch a Swagger Web API.

Next Steps

    The database implementation (PostgreSQL or MongoDB) will be added later.
    For now, we will use a mock database for testing.
    Database version control will be discussed in future updates.
