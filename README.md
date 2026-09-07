# 🚀 Youth Career Guide

A modern, full-stack career guidance platform designed to help students, graduates, and young professionals explore career paths, develop relevant skills, discover opportunities, and find jobs using AI-powered search.

---

## 📌 About

**Youth Career Guide** is a simple career exploration platform that brings career information, learning resources, opportunities, and AI-assisted job discovery into one place.

The project focuses on providing a clean and easy-to-use experience rather than building a large recruitment platform.

---

## ✨ Features

### 🧭 Career Explorer

Explore different career paths and understand:

* Career overview
* Required education
* Essential skills
* Career demand
* Career progression
* Related careers

### 📚 Career Resources

Access useful guides covering:

* Resume building
* Interview preparation
* Internship searching
* Career planning
* Portfolio building
* Professional development

### 💼 Opportunities

Browse curated/demo:

* Internships
* Entry-level jobs
* Remote opportunities
* On-site opportunities

### 🤖 AI Job Finder

Describe the type of job you're looking for using natural language.

Example:

> "Find frontend developer internships for freshers in India."

The system can process the request and return structured job cards containing:

* Job title
* Company
* Location
* Job type
* Work mode
* Salary
* Required skills
* Posted date
* Source
* Original job link

The **View Job** button takes users to the original listing.

> External job data must only be collected through permitted APIs, feeds, licensed datasets, approved integrations, or other allowed access methods. The application must not scrape restricted/private LinkedIn content.

### 📩 Contact

Users can submit questions or feedback through a contact form.

---

# 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* Next.js API Routes
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### AI

* OpenAI API or another compatible AI provider

---

# 📁 Project Structure

```text
youth-career-guide/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── careers/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── resources/
│   │   │   └── page.tsx
│   │   ├── opportunities/
│   │   │   └── page.tsx
│   │   ├── ai-jobs/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── careers/
│   │       ├── resources/
│   │       ├── opportunities/
│   │       ├── ai-jobs/
│   │       └── contact/
│   │
│   ├── components/
│   │   ├── Navbar
│   │   ├── Footer
│   │   ├── Button
│   │   ├── CareerCard
│   │   ├── ResourceCard
│   │   ├── OpportunityCard
│   │   ├── JobCard
│   │   └── FilterTabs
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   └── data/
│       └── seed.ts
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   └── assets/
│
├── .env
├── package.json
└── README.md
```

---

# 🌐 Pages

| Page           | Route            | Purpose                             |
| -------------- | ---------------- | ----------------------------------- |
| Home           | `/`              | Introduction and featured content   |
| Careers        | `/careers`       | Browse career paths                 |
| Career Details | `/careers/:id`   | Detailed career information         |
| Resources      | `/resources`     | Career guides and articles          |
| Opportunities  | `/opportunities` | Browse available/demo opportunities |
| AI Job Finder  | `/ai-jobs`       | AI-assisted job discovery           |
| About          | `/about`         | Platform information                |
| Contact        | `/contact`       | Contact form                        |

---

# 🗄️ Database

The initial database contains four main models.

### Career

```text
id
title
slug
category
description
education
demand
skills
careerPath
createdAt
updatedAt
```

### Resource

```text
id
title
category
description
content
readTime
createdAt
updatedAt
```

### Opportunity

```text
id
title
company
location
type
workMode
salary
description
deadline
createdAt
updatedAt
```

### ContactMessage

```text
id
name
email
subject
message
createdAt
```

---

# 🔌 API

### Careers

```http
GET /api/careers
GET /api/careers/:id
```

Optional:

```http
GET /api/careers?category=Technology
```

### Resources

```http
GET /api/resources
```

### Opportunities

```http
GET /api/opportunities
```

### AI Jobs

```http
POST /api/ai-jobs
```

Example request:

```json
{
  "query": "Frontend developer internships for freshers",
  "location": "India",
  "jobType": "Internship",
  "experience": "Entry Level",
  "workMode": "Remote"
}
```

### Contact

```http
POST /api/contact
```

---

# 🤖 AI Job Finder Flow

```text
User Search
     ↓
Frontend
     ↓
POST /api/ai-jobs
     ↓
Backend
     ↓
Permitted Job Sources
     ↓
Normalize Job Data
     ↓
AI Processing
     ↓
Structured Job Results
     ↓
Job Cards
     ↓
Original Job Listing
```

The AI is used to understand the user's search and structure/match retrieved information.

It must **never fabricate job listings or external links**.

---

# 🔐 Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_connection_string"

OPENAI_API_KEY="your_ai_api_key"

JOB_API_KEY="your_job_source_api_key"
```

Never expose API keys in frontend code or commit `.env` to Git.

---

# ⚙️ Installation

Clone the project:

```bash
git clone <repository-url>
cd youth-career-guide
```

Install dependencies:

```bash
npm install
```

Create your `.env` file and configure the required variables.

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🎨 Design

The interface follows a:

**Modern · Minimal · Youthful · Professional**

design language.

### Primary Colors

```text
Primary: #4F46E5
Secondary: #7C3AED
Background: #F8FAFC
Text: #111827
Muted: #64748B
Border: #E2E8F0
```

The application is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile

---

# 🎯 Project Scope

This project intentionally avoids unnecessary complexity.

### Included

* Responsive frontend
* PostgreSQL database
* Prisma ORM
* Backend API
* Dynamic career data
* Dynamic resources
* Dynamic opportunities
* Contact form
* AI job discovery

### Not Included

* User authentication
* User profiles
* Admin dashboard
* Payments
* Chat system
* Resume generator
* Complex recommendation engine
* Real-time notifications
* Job application management

---

# ⚠️ External Job Data

Job listings displayed through the AI Job Finder should come only from sources that permit the intended access.

The application must:

* Preserve the original source
* Link users to the original listing
* Avoid fabricating job information
* Avoid scraping private/restricted content
* Avoid bypassing authentication or access controls
* Clearly identify the source of each listing

---

# 📄 License

This project is created for educational and demonstration purposes.

