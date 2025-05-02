# DevConnect - Full-Stack Next.js Application

A modern web application built with Next.js that demonstrates authentication, database operations, email notifications, and responsive UI design.

## Features

- **Authentication** with Firebase (Email/Password and Google Sign-in)
- **Public Landing Page** with welcome and about sections
- **Protected Dashboard** for authenticated users
- **Full CRUD operations** for posts via Next.js API routes
- **Email notifications** when users create new posts
- **State management** using Context API
- **PostgreSQL database** with Sequelize ORM

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Authentication**: Firebase Authentication
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Sequelize ORM
- **Email Service**: Nodemailer
- **Styling**: Tailwind CSS & Framer Motion
- **Icons**: Lucide React

## Local Development Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Git
- PostgreSQL installed and running

### Installation Steps

1. **Clone Repository:**
   ```bash
   git clone https://github.com/AsithaUdara/DevConnect.git
   cd DevConnect
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   - Create a `.env.local` file in the project root with:
     ```
     # Database
     DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database_name>
     
     # Firebase Authentication
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     
     # Firebase Admin (for API authentication)
     FIREBASE_PROJECT_ID=your_project_id
     FIREBASE_PRIVATE_KEY="your_private_key"
     FIREBASE_CLIENT_EMAIL=your_client_email
     
     # Email Configuration
     EMAIL_HOST=smtp.example.com
     EMAIL_PORT=587
     EMAIL_USER=your_email@example.com
     EMAIL_PASSWORD=your_email_password
     EMAIL_FROM=noreply@devconnect.com
     ```

4. **Set Up Local Database:**
   ```sql
   CREATE USER myuser WITH PASSWORD 'your_password';
   CREATE DATABASE devconnect;
   GRANT ALL PRIVILEGES ON DATABASE devconnect TO myuser;
   ```

5. **Synchronize Database Schema:**
   ```bash
   npm run db:sync
   # or
   yarn db:sync
   ```

6. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── public/
├── src/
│   ├── app/              # Next.js App Router files
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Protected dashboard
│   │   └── page.tsx      # Landing page
│   ├── components/       # Reusable UI components
│   ├── contexts/         # Context providers
│   ├── lib/              # Utility functions
│   │   ├── firebase.ts   # Firebase configuration
│   │   ├── db.ts         # Database connection
│   │   └── email.ts      # Email service
│   ├── models/           # Sequelize models
│   └── types/            # TypeScript type definitions
├── .env.example
├── .env.local            # (gitignored) Local environment variables
├── next.config.js
├── package.json
└── tailwind.config.js
```

## Features Implemented

- [x] Firebase Authentication (Email/Password and Google)
- [x] Public Landing Page with attractive UI
- [x] Protected Dashboard for authenticated users
- [x] CRUD operations for posts via API routes
- [x] PostgreSQL database with Sequelize ORM
- [x] Email notifications for new posts
- [x] Context API for state management
- [x] Responsive design
- [x] Protected routes

## Notes

- The application uses Firebase authentication for user management
- PostgreSQL is used as the database with Sequelize as the ORM
- Emails are sent using Nodemailer when posts are created
- The UI is built with Tailwind CSS for responsive design