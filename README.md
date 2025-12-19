# Library Management System

A full-stack library management application with .NET 10 backend API and React + TypeScript frontend.

## Tech Stack

**Backend:**
- .NET 10 Web API
- SQLite Database
- Entity Framework Core 10
- JWT Authentication
- ASP.NET Core Identity

**Frontend:**
- React 19 + TypeScript
- Vite
- Material UI (MUI)
- TailwindCSS 4
- Axios
- React Router
- React Hook Form

## Prerequisites

Before running this application, ensure you have the following installed:

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Backend Setup

Navigate to the API project directory:

```bash
cd "LibraryManagement.Api"
```

#### Install Dependencies

Restore NuGet packages:

```bash
dotnet restore
```

#### Database Setup

The application uses SQLite database. Apply migrations to create the database:

```bash
dotnet ef database update
```

This will create a `library.db` file in the API project directory.

#### Run the Backend

Start the API server:

```bash
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5131`
- HTTPS: `https://localhost:7122`

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd "LibraryManagement.Frontend"
```

#### Install Dependencies

Install npm packages:

```bash
npm install
```

#### Run the Frontend

Start the development server:

```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## Running the Application

1. **Start the Backend** (Terminal 1):
   ```bash
   cd "LibraryManagement.Api"
   dotnet run
   ```

2. **Start the Frontend** (Terminal 2):
   ```bash
   cd "LibraryManagement.Frontend"
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`


## API Endpoints

The API runs on `http://localhost:5131` with the following endpoints:

- **Authentication:**
  - `POST /api/auth/register` - Register new user
  - `POST /api/auth/login` - Login user

- **Books:**
  - `GET /api/books` - Get all books
  - `GET /api/books/{id}` - Get book by ID
  - `POST /api/books` - Create new book (requires authentication)
  - `PUT /api/books/{id}` - Update book (requires authentication)
  - `DELETE /api/books/{id}` - Delete book (requires authentication)

## Environment Variables

### Backend (appsettings.json)

The application uses the following configuration:

- **Database:** SQLite (`library.db`)
- **JWT Settings:**
  - Issuer: `LibraryManagement.Api`
  - Audience: `LibraryManagement.Client`
  - Token Expiration: 60 minutes

### Frontend

The frontend is configured to connect to the backend at `http://localhost:5131` via CORS.


## Troubleshooting

### Backend Issues

- **Port already in use:** Change the port in `Properties/launchSettings.json`
- **Database errors:** Delete `library.db` and run `dotnet ef database update` again
- **Migration errors:** Run `dotnet ef migrations add InitialCreate` if migrations are missing

### Frontend Issues

- **Port 5173 in use:** Vite will automatically use the next available port
- **API connection errors:** Ensure the backend is running on `http://localhost:5131`
- **Module errors:** Delete `node_modules` and run `npm install` again

## Additional Commands

### Backend

```bash
# Create new migration
dotnet ef migrations add MigrationName

# Remove last migration
dotnet ef migrations remove

# Update database to specific migration
dotnet ef database update MigrationName
```
