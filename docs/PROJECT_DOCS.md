# cv.craft — ATS-Ready Resume Builder

## Project Overview

**cv.craft** is a modern, full-stack resume builder application that helps users create ATS (Applicant Tracking System) optimized resumes. The application features a dark-themed, premium UI with real-time preview and drag-and-drop functionality.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS |
| State | React Context API (`useAppContext`) |
| Drag & Drop | `@hello-pangea/dnd` |
| Icons | `react-icons` |
| Backend | Django REST Framework |
| Database | SQLite (development), PostgreSQL (production ready) |
| Auth | JWT-based authentication |

## Project Structure

```
resume-ats-crack-builder/
├── frontend/                    # Next.js application
│   ├── app/                     # App Router pages
│   │   ├── (home)/              # Public landing pages
│   │   ├── (control)/           # Dashboard & CV builder
│   │   └── (about)/             # About page
│   ├── components/
│   │   ├── cv-builder/          # CV editor components
│   │   │   ├── control-components/  # Editor sections
│   │   │   ├── reviewer/        # CV preview components
│   │   │   └── utils/           # Drag & drop utilities
│   │   ├── dashboard/           # Dashboard components
│   │   ├── general/             # Reusable UI components
│   │   ├── home/                # Landing page sections
│   │   ├── layout/              # Navbar, Footer
│   │   └── svgs/                # SVG icon components
│   ├── context/                 # React Context providers
│   ├── hooks/                   # Custom React hooks
│   ├── actions/                 # Server actions for API calls
│   └── lib/                     # Utilities & helpers
└── backend/                     # Django application
    ├── cvs/                     # CV model & views
    └── users/                   # User authentication
```

## Key Features

### CV Builder
- **Real-time Preview** — See changes instantly as you type
- **Drag & Drop** — Reorder sections and items
- **ATS Optimized** — Clean, parseable output for ATS systems
- **PDF Export** — Download as pixel-perfect PDF

### Editor Sections
| Section | Description |
|---------|-------------|
| Profile | Summary/objective statement |
| Contact | Name, email, phone, location, social links |
| Work Experience | Jobs with achievements, technologies |
| Education | Degrees, institutions, dates |
| Projects | Personal/professional projects |
| Skills | Technical skills organized by category |
| Languages | Language proficiency levels |
| Certifications | Courses and achievements |

### Dashboard
- View all saved resumes
- Create new resumes
- Import/Export JSON data
- Sync with backend

## Data Model

CVs are stored as JSON with this structure:

```json
{
  "id": "uuid",
  "title": "Resume Title",
  "data": {
    "name": "User Name",
    "position": "Job Title",
    "email": "email@example.com",
    "contactInformation": "+1234567890",
    "address": "City, Country",
    "summary": [...],
    "workExperience": [...],
    "educations": [...],
    "projects": [...],
    "skills": [...],
    "languages": [...],
    "courses": [...],
    "socialMedia": [...],
    "order": ["profile", "workExperience", "education", ...],
    "titles": { "profile": "PROFILE", ... }
  }
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cvs/` | List user's CVs |
| POST | `/api/cvs/` | Create new CV |
| GET | `/api/cvs/{id}/` | Get CV details |
| PUT | `/api/cvs/{id}/` | Update CV |
| DELETE | `/api/cvs/{id}/` | Delete CV |

## Running Locally

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Environment Variables

```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

# backend/.env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```
