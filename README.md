# COUU-EHS (Environmental Health and Safety System)

COUU-EHS is a responsive Environmental Health and Safety Application System designed for Chukwuemeka Odumegwu Ojukwu University (COOU). The platform enables digital reporting of campus hazards, response tracking, safety alert publication, and compliance reporting.

## 🚀 Features

- **Triage Command Center:** EHS officers and supervisors can monitor active hazards, update timelines, and authorize closure requests.
- **Digital Field Reporting:** Students and staff can submit safety hazards with location, category, severity, and photo evidence.
- **Real-Time Safety Alerts:** Emergency notifications targeting specific campus sectors.
- **Unified Safety Metrics:** Live counts for compliance reviews and performance audits.

---

## 🛠️ Backend Stack (Supabase Integration)

The application features a full Supabase integration. When configured, it fetches and mutates database tables in real-time. If environment parameters are missing, the system gracefully falls back to mock storage.

### 1. Database Tables Schema
Run the SQL queries in [supabase_schema.sql](file:///c:/Users/U%20S%20E%20R/Drips/Devfoma/Final/Christian/Environmental_health/supabase_schema.sql) in your Supabase SQL Editor to provision the database:

* **`profiles`:** User table mapping Auth IDs to roles (`student`, `staff`, `officer`, `supervisor`, `admin`, `management`).
* **`hazard_reports`:** Records incidents, status workflows (`Reported`, `Assigned`, `In Progress`, `Resolved`), priorities, and response assignments.
* **`alerts`:** Broad warnings or routine drills pushed to campus portals.
* **`activity_logs`:** History of actions taken by safety personnel.

---

## ⚙️ Configuration & Setup

### Step 1: Clone and Install Dependencies
```bash
npm install
```

### Step 2: Supabase Environment Variables
Create a `.env` file in the root directory and add your Supabase project parameters:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Run the Application Locally
To start the Vite development server:
```bash
npm run dev
```

### Step 4: Authentication and Role Routing
The landing page gives first-time users practical guidance about what to report, what details to prepare, and how reports are tracked after submission. Sign-in and sign-up open as modals so users can authenticate without leaving the public information page.

The sign-in modal uses Supabase Auth email/password sessions. On signup, the app creates a linked `profiles` row for student or staff users. Operational dashboards are not selected in the browser; they are routed from `profiles.role` in Supabase.

Authenticated users can open their profile from the header to review their role and workspace access. Signing out is now an explicit action inside the profile modal.

To grant elevated dashboards, update the user's `profiles.role` value in Supabase to one of:
`officer`, `supervisor`, `admin`, or `management`.

### Step 5: Build for Production
To bundle the frontend with assets:
```bash
npm run build
```

---

## 🔒 Security & Row Level Security (RLS)

All tables inside the [supabase_schema.sql](file:///c:/Users/U%20S%20E%20R/Drips/Devfoma/Final/Christian/Environmental_health/supabase_schema.sql) schema enforce Row Level Security:
- **Profiles:** Users can only modify their own profiles.
- **Incident Reporting:** Students and staff can file concerns and view only their own reports. Officers, supervisors, administrators, and management can view broader operational records according to their assigned role. Only administrators, supervisors, and officers can edit assignments or update resolution parameters.
- **Alerts:** Only supervisors or administrators can insert safety notifications.
