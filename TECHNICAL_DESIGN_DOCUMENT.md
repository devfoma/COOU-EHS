# Technical Design Document

## Environmental Health and Safety Application System for COOU

**Project:** Environmental Health and Safety Application System  
**Case Study:** Chukwuemeka Odumegwu Ojukwu University (COOU)  
**Primary Users:** Students, staff, environmental health officers, administrators, university management  
**Design Reference:** `UI_DESIGN/`  
**Document Type:** Technical Design Document (TDD)  
**Date:** 2026-07-17

---

## 1. Project Overview

The Environmental Health and Safety Application System is a centralized digital platform for reporting, tracking, monitoring, and resolving environmental health and safety issues within COOU. The system replaces manual, paper-based, and fragmented safety reporting processes with a responsive web application that supports both mobile campus users and desktop administrative users.

The application focuses on fast hazard reporting, real-time incident monitoring, safety alerts, officer response workflows, analytics, audit reporting, and centralized record keeping. It is designed to improve response time, data accuracy, accountability, and decision-making for university safety management.

The product experience must follow the design language in `UI_DESIGN/`: a dark, clinical, high-contrast, glassmorphic corporate interface branded as **COOU EHS** and **Campus Safe**.

---

## 2. Problem Statement

Current environmental health and safety practices at COOU are mostly manual and decentralized. Hazards such as waste accumulation, unsafe buildings, sanitation issues, laboratory accidents, electrical faults, and fire risks are often reported verbally or through paper records.

This creates several operational problems:

- Delayed hazard reporting and response.
- Loss, duplication, or damage of incident records.
- Poor visibility into recurring safety issues.
- Weak communication between students, staff, EHS officers, and management.
- Limited data for risk analysis, policy planning, and compliance audits.
- Difficulty enforcing environmental health and safety standards across campus.

The proposed system solves these problems by creating one trusted platform for safety reporting, incident workflow management, notifications, evidence collection, analytics, and administrative oversight.

---

## 3. Project Objectives

The system must:

1. Provide a fast and reliable digital platform for reporting campus hazards.
2. Allow students and staff to track the status of submitted reports.
3. Give EHS officers a command center for triage, assignment, and response.
4. Provide administrators with centralized safety records and analytics.
5. Support real-time alerts for critical campus safety events.
6. Improve documentation, audit readiness, and accountability.
7. Promote safer campus behavior through visibility and feedback.
8. Support future expansion into mobile apps, GIS hazard mapping, and regulatory integrations.

---

## 4. Product Scope

### In Scope

- User registration and authentication.
- Role-based dashboards.
- Digital hazard reporting.
- Evidence upload for photos and documents.
- Hazard categorization and severity assignment.
- Incident tracking and resolution timeline.
- Officer assignment and status updates.
- Campus-wide safety alerts.
- Administrative analytics and audit reports.
- Centralized database for users, reports, alerts, evidence, and actions.
- Responsive desktop and mobile UI based on `UI_DESIGN/`.

### Out of Scope for Initial Version

- External community reporting outside COOU.
- Direct integration with national regulatory agencies.
- Native mobile application store deployment.
- Live IoT sensor integrations.
- Advanced GIS mapping beyond simple location text and campus zones.
- Payment, billing, or unrelated administrative modules.

---

## 5. User Roles and Permissions

| Role | Description | Key Permissions |
| --- | --- | --- |
| Student | Reports hazards and tracks submitted cases. | Create reports, upload evidence, view own reports, receive alerts. |
| Staff | Reports hazards and tracks campus safety concerns. | Same as student, with staff department metadata. |
| EHS Officer | Handles safety operations and field response. | View assigned incidents, update status, add timeline notes, upload resolution proof. |
| EHS Supervisor | Oversees officer workload and high-risk incidents. | Assign officers, change severity, approve closures, publish alerts. |
| Administrator | Manages system configuration and users. | Manage users, categories, locations, roles, reports, analytics, and exports. |
| Management | Views high-level performance and compliance reports. | Read-only analytics, audit exports, trend reports. |

---

## 6. Design System Requirements

The implementation must follow the **Clinical Clarity & Safety** design pattern in `UI_DESIGN/DESIGN.md`.

### Visual Personality

- Authoritative, precise, urgent, and reliable.
- Dark-mode first for command-center and safety-monitoring use.
- Hybrid glassmorphism and modern corporate styling.
- High contrast for critical operational readability.
- Dense information layouts for officers and administrators.
- Simple, action-first mobile flows for students and staff.

### Color Tokens

| Purpose | Token | Color |
| --- | --- | --- |
| Main background | `background`, `surface` | `#051424` |
| Deep container | `surface-container-lowest` | `#010f1f` |
| Standard panel | `surface-container` | `#122131` |
| Raised panel | `surface-container-high` | `#1c2b3c` |
| Primary text | `on-surface` | `#d4e4fa` |
| Muted text | `on-surface-variant` | `#c6c6cd` |
| Safety/action green | `secondary` | `#4ae176` |
| Warning amber | `tertiary` | `#ffb95f` |
| Critical red | `error` | `#ffb4ab` |

### Typography

- Headings: **Outfit**
- Body and form text: **Inter**
- Data-heavy values: Inter with tabular number settings.
- Desktop page titles use strong headline/display styles.
- Mobile headings use the smaller mobile headline tokens from the UI mocks.

### Layout Pattern

- Desktop uses a hub-and-spoke command-center layout.
- Left sidebar is condensed by default and expands on hover or toggle.
- Top navigation shows major areas: Dashboard, Hazard Reports, Analytics.
- Mobile uses bottom navigation with Dashboard, Report, and Alerts.
- Main desktop pages use a 12-column responsive grid.
- Mobile pages use a 4-column layout with 16px gutters.

### Components

The application should standardize the following components:

- Glass panels with `rgba(30, 41, 59, 0.7)` and `backdrop-filter: blur(12px)`.
- Severity chips for Low, Medium, High, and Critical.
- Dense incident cards with category, location, timestamp, severity, and action.
- Metric cards with large numerical value, label, trend, and optional sparkline.
- Timeline steps for incident lifecycle events.
- Form fields with translucent backgrounds and green focus state.
- Primary buttons in safety green.
- Emergency or critical actions in red.
- Warning states in amber.
- Officer/admin tables or high-density lists with subtle separators.

### Shape and Spacing

- Inputs and buttons: 4px to 8px radius.
- Large panels/cards: 8px radius.
- Status chips: fully rounded pills.
- Base spacing unit: 4px.
- Default content padding: 24px desktop, 16px mobile.

---

## 7. Screen Inventory

The following screens are represented in `UI_DESIGN/` and should guide implementation.

| UI Design Folder | Product Screen | Primary Role | Purpose |
| --- | --- | --- | --- |
| `mobile_my_safety_dashboard` | My Safety Dashboard | Student/Staff | Shows personal report count, resolved cases, active reports, and recent activity. |
| `mobile_report_a_hazard` | Mobile Hazard Report | Student/Staff | Fast mobile form for category, location, evidence, risk level, and details. |
| `mobile_incident_tracker` | Mobile Incident Tracker | Student/Staff | Shows report status, risk, category, resolution progress, photo evidence, and share actions. |
| `mobile_campus_alerts` | Campus Alerts | Student/Staff | Displays urgent campus safety notices and immediate assistance action. |
| `report_a_hazard` | Desktop Hazard Reporting | Student/Staff/Admin | Full desktop form for hazard title, category, location, evidence, severity, and description. |
| `ehs_officer_command_center` | Officer Command Center | EHS Officer/Supervisor | Real-time active hazards, filters, incident feed, heat map, protocols, and quick actions. |
| `incident_details_timeline` | Incident Details and Resolution | EHS Officer/Supervisor | Timeline, evidence, resolution form, compliance signoff, and unit oversight. |
| `safety_analytics_audits` | Analytics and Compliance Audit | Administrator/Management | Compliance score, active hazards, response time, audit progress, trends, hotspots, and findings. |

---

## 8. Information Architecture

```text
Public
  Login
  Register
  Forgot Password

Campus User Area
  My Safety Dashboard
  Report Hazard
  Incident Tracker
  Campus Alerts
  Profile

Officer Area
  Officer Command Center
  Active Incident Feed
  Incident Details
  Resolution Form
  Protocols

Admin Area
  Dashboard
  Hazard Reports
  User Management
  Location Management
  Category Management
  Safety Alerts
  Analytics and Audits
  System Settings
```

---

## 9. Core User Journeys

### 9.1 Student or Staff Reports a Hazard

1. User logs in.
2. User opens Report Hazard.
3. User selects hazard category.
4. User enters exact location.
5. User uploads photo or document evidence.
6. User selects severity level.
7. User describes the hazard.
8. System validates required fields.
9. System creates a hazard report with status `pending_review`.
10. System notifies EHS officers and shows the report in the user's dashboard.

### 9.2 EHS Officer Handles an Incident

1. Officer opens the command center.
2. Officer filters active reports by category, severity, location, or status.
3. Officer opens an incident detail page.
4. Officer updates status to `assigned` or `in_progress`.
5. Officer records actions taken and uploads supporting evidence.
6. Officer completes resolution form.
7. Supervisor reviews and approves closure where required.
8. System notifies reporter and updates analytics.

### 9.3 Administrator Publishes a Campus Alert

1. Administrator or supervisor creates an alert.
2. Alert is assigned severity, campus zone, title, description, and instructions.
3. Critical alerts are pushed to all affected users.
4. Alert appears in Campus Alerts and officer dashboards.
5. Alert remains active until expired or manually resolved.

### 9.4 Management Reviews Safety Performance

1. Management opens Analytics and Compliance Audit.
2. System displays compliance score, active hazards, average response time, and audit progress.
3. Management filters by campus, department, category, or date range.
4. Management exports audit report for institutional review.

---

## 10. Functional Requirements

### Authentication and User Accounts

- Users must register with name, email, password, role, department, address, and optional profile photo.
- Users must log in with email and password.
- Passwords must be securely hashed.
- Users must be assigned exactly one primary role.
- Admins must be able to activate, suspend, or update users.
- Sessions must expire after inactivity.

### Hazard Reporting

- Users must be able to create a hazard report from mobile and desktop.
- Required fields: title, category, location, severity, description.
- Optional fields: photo evidence, document evidence, GPS coordinates, building, floor, room.
- Categories must include at least waste, sanitation, infrastructure, fire, electrical, laboratory, biological, and security.
- Severity must support low, medium, high, and critical.
- Every report must receive a unique tracking ID.
- On submission, the report status must start as `pending_review`.

### Incident Tracking

- Users must see the current status of their reports.
- Officers must see all reports assigned to them.
- Supervisors and admins must see all reports.
- Incident statuses must include `pending_review`, `assigned`, `in_progress`, `awaiting_verification`, `resolved`, `rejected`, and `closed`.
- Each status change must create a timeline event.
- Timeline events must store actor, timestamp, status, note, and attachments.

### Evidence Management

- Users and officers must be able to upload images and documents.
- Evidence must be linked to a hazard report or timeline event.
- Uploads must validate file type and size.
- Uploaded files must not be executable.
- Evidence must be viewable from incident detail pages.

### Alerts and Notifications

- Supervisors and admins must be able to create campus alerts.
- Alerts must include title, severity, affected location, message, safety instruction, start time, and end time.
- Critical alerts must be visually prominent using red/error styling.
- Warnings must use amber styling.
- Stable or informational notices must use green or neutral styling.
- Users must receive notification records in the app.

### Officer Command Center

- Officers must see active hazards, resolved count, average response time, and incident feed.
- Officers must filter incidents by category, priority, facility location, and status.
- Officers must take action from incident cards.
- Officers must access urgent protocols from the command center.
- Supervisors must be able to assign or reassign incidents.

### Resolution Workflow

- Officers must enter a final disposition summary.
- Resolution forms must support safety measurements where relevant, such as air quality and surface pH.
- Officers must upload post-cleanup proof.
- Officers must confirm compliance signoff before submitting resolution.
- Supervisor approval must be required for high and critical incidents.
- Reporter must be notified when an incident is resolved or closed.

### Analytics and Audits

- Admins and management must view safety KPIs.
- Required KPIs: compliance score, active hazards, average response time, annual audit progress, top hazard locations, department efficiency.
- System must show incident trends over selectable periods.
- System must support export of audit reports.
- Analytics must update when reports, statuses, or alerts change.

### Administration

- Admins must manage users, roles, categories, locations, and system settings.
- Admins must view all reports and timeline history.
- Admins must generate reports by date range, severity, status, category, and location.
- Admins must configure campus zones and departments.

---

## 11. Non-Functional Requirements

### Performance

- Dashboard summary data should load within 2 seconds under normal conditions.
- Hazard report submission should complete within 3 seconds after upload processing.
- Analytics queries should support date and category filters without blocking core reporting flows.

### Security

- Passwords must be hashed with a strong hashing algorithm.
- Access must be role-based.
- Users must not access reports they are not permitted to view.
- File uploads must be scanned or validated before storage.
- API requests must be authenticated.
- Sensitive actions must be logged.

### Reliability

- Hazard submissions must not be lost if notification delivery fails.
- Each report must have a durable database record before alerts are sent.
- Status transitions must be atomic.
- Audit logs must not be editable by regular users.

### Usability

- Mobile reporting must be possible in under one minute for common hazards.
- Critical actions must be visually distinct.
- Form errors must be clear and placed near the affected field.
- The interface must remain legible on mobile and desktop.

### Accessibility

- Color must not be the only indicator of severity.
- Buttons and form fields must have accessible names.
- Text contrast must satisfy WCAG AA where possible.
- Keyboard navigation must be supported on desktop.
- Focus states must be visible using green focus outlines or glows.

---

## 12. Recommended Technology Stack

The seminar brief identifies the system as a web-based application with a centralized database. The UI designs are already expressed as HTML/Tailwind-style screens. The recommended implementation stack is:

### Frontend

- React with TypeScript.
- Tailwind CSS configured with tokens from `UI_DESIGN/DESIGN.md`.
- React Router or Next.js routing.
- Material Symbols or Lucide icons, matching the current UI prototypes.
- React Hook Form or equivalent for validated forms.

### Backend

- PHP Laravel REST API or Node.js/Express REST API.
- MySQL database.
- JWT or secure cookie-based authentication.
- Server-side validation for all submitted data.
- Background job support for notifications and report exports.

### Storage

- MySQL for structured application data.
- Local server or object storage for uploaded evidence files.
- File metadata stored in the database.

### Reporting

- Server-generated CSV/PDF exports for audit reports.
- Dashboard aggregation endpoints for analytics.

If the project must remain close to the seminar's basic stack, the same architecture can be implemented with HTML, CSS, JavaScript, PHP, and MySQL. The data models and UI requirements in this TDD remain the same.

---

## 13. System Architecture

```text
Client Layer
  Mobile Responsive UI
  Desktop Officer/Admin UI
  Form Validation
  Role-Based Navigation

API Layer
  Authentication API
  Hazard Report API
  Incident Workflow API
  Evidence Upload API
  Alert API
  Analytics API
  Admin API

Service Layer
  Role Permission Service
  Incident Assignment Service
  Notification Service
  Audit Log Service
  Report Export Service
  Analytics Aggregation Service

Data Layer
  MySQL Database
  Evidence File Storage
  Audit Logs
```

### Architecture Principles

- Keep reporting flow simple and reliable.
- Store core records before sending notifications.
- Use role-based access checks at the API level and UI level.
- Treat incident timeline as an append-only audit history.
- Separate analytics aggregation from transactional report submission.
- Reuse one design system across all screens.

---

## 14. Data Model

### users

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| full_name | VARCHAR | User legal or display name |
| username | VARCHAR | Optional nickname |
| email | VARCHAR | Unique |
| password_hash | VARCHAR | Hashed password |
| role | ENUM | student, staff, officer, supervisor, admin, management |
| department_id | FK | Nullable |
| address | TEXT | Optional |
| profile_photo_url | VARCHAR | Optional |
| status | ENUM | active, suspended, inactive |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Update timestamp |

### departments

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| name | VARCHAR | Department or unit name |
| code | VARCHAR | Optional short code |
| created_at | DATETIME | Creation timestamp |

### locations

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| campus | VARCHAR | Campus name |
| zone | VARCHAR | Zone or area |
| building | VARCHAR | Building name |
| floor | VARCHAR | Optional |
| room | VARCHAR | Optional |
| latitude | DECIMAL | Optional |
| longitude | DECIMAL | Optional |

### hazard_categories

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| name | VARCHAR | Waste, Fire, Electrical, etc. |
| icon | VARCHAR | UI icon key |
| default_priority | ENUM | low, medium, high, critical |
| is_active | BOOLEAN | Category availability |

### hazard_reports

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| tracking_code | VARCHAR | Example: HAZ-2904 |
| reporter_id | FK users.id | User who created report |
| assigned_officer_id | FK users.id | Nullable |
| category_id | FK hazard_categories.id | Required |
| location_id | FK locations.id | Nullable for free-text locations |
| location_text | VARCHAR | User-entered location |
| title | VARCHAR | Short hazard title |
| description | TEXT | Detailed report |
| severity | ENUM | low, medium, high, critical |
| status | ENUM | pending_review, assigned, in_progress, awaiting_verification, resolved, rejected, closed |
| reported_at | DATETIME | Submission timestamp |
| resolved_at | DATETIME | Nullable |
| closed_at | DATETIME | Nullable |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Update timestamp |

### incident_timeline_events

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| hazard_report_id | FK | Related incident |
| actor_id | FK users.id | User who performed action |
| event_type | ENUM | submitted, assigned, status_changed, note_added, evidence_uploaded, resolved, closed |
| from_status | ENUM | Nullable |
| to_status | ENUM | Nullable |
| note | TEXT | Optional |
| created_at | DATETIME | Event timestamp |

### evidence_files

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| hazard_report_id | FK | Related report |
| timeline_event_id | FK | Optional |
| uploaded_by | FK users.id | Owner |
| file_url | VARCHAR | Storage URL/path |
| file_type | VARCHAR | MIME type |
| file_size | BIGINT | Size in bytes |
| caption | VARCHAR | Optional |
| created_at | DATETIME | Upload timestamp |

### campus_alerts

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| created_by | FK users.id | Admin/supervisor |
| title | VARCHAR | Alert title |
| message | TEXT | Alert body |
| severity | ENUM | info, low, medium, high, critical |
| location_id | FK locations.id | Optional |
| instruction | TEXT | Safety instruction |
| starts_at | DATETIME | Visibility start |
| ends_at | DATETIME | Nullable |
| status | ENUM | draft, active, expired, resolved |
| created_at | DATETIME | Creation timestamp |

### notifications

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| user_id | FK users.id | Recipient |
| type | ENUM | report_update, assignment, alert, system |
| title | VARCHAR | Notification title |
| body | TEXT | Notification body |
| related_entity_type | VARCHAR | Optional |
| related_entity_id | VARCHAR | Optional |
| read_at | DATETIME | Nullable |
| created_at | DATETIME | Creation timestamp |

### resolution_records

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| hazard_report_id | FK | Related incident |
| officer_id | FK users.id | Resolving officer |
| disposition_summary | TEXT | Final action summary |
| air_quality_ppm | DECIMAL | Optional |
| surface_ph | VARCHAR | Optional |
| compliance_signoff | BOOLEAN | Required for closure |
| supervisor_approved_by | FK users.id | Nullable |
| supervisor_approved_at | DATETIME | Nullable |
| created_at | DATETIME | Creation timestamp |

### audit_logs

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID / BIGINT | Primary key |
| actor_id | FK users.id | User who performed action |
| action | VARCHAR | Action name |
| entity_type | VARCHAR | Table/domain object |
| entity_id | VARCHAR | Related record |
| metadata_json | JSON | Before/after or context |
| created_at | DATETIME | Event timestamp |

---

## 15. API Design

### Authentication

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create user account |
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/auth/logout` | End session |
| GET | `/api/auth/me` | Get current user profile |

### Hazard Reports

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/reports` | List reports based on role and filters |
| POST | `/api/reports` | Create hazard report |
| GET | `/api/reports/{id}` | View report details |
| PATCH | `/api/reports/{id}` | Update report metadata |
| POST | `/api/reports/{id}/assign` | Assign officer |
| POST | `/api/reports/{id}/status` | Change incident status |
| GET | `/api/reports/{id}/timeline` | Get timeline events |

### Evidence

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/reports/{id}/evidence` | Upload report evidence |
| GET | `/api/reports/{id}/evidence` | List evidence files |
| DELETE | `/api/evidence/{id}` | Remove evidence where permitted |

### Resolution

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/reports/{id}/resolution` | Submit resolution record |
| POST | `/api/resolutions/{id}/approve` | Supervisor approval |

### Alerts

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/alerts` | List active or historical alerts |
| POST | `/api/alerts` | Create alert |
| PATCH | `/api/alerts/{id}` | Update alert |
| POST | `/api/alerts/{id}/resolve` | Resolve alert |

### Analytics

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/analytics/summary` | Dashboard metrics |
| GET | `/api/analytics/trends` | Incident trend data |
| GET | `/api/analytics/hotspots` | Hazard location ranking |
| GET | `/api/analytics/departments` | Department response metrics |
| GET | `/api/audits/export` | Export audit report |

### Administration

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/admin/users` | List users |
| PATCH | `/api/admin/users/{id}` | Update user |
| GET | `/api/admin/categories` | List categories |
| POST | `/api/admin/categories` | Create category |
| GET | `/api/admin/locations` | List campus locations |
| POST | `/api/admin/locations` | Create location |

---

## 16. Business Rules

- A hazard report cannot be submitted without title, category, location, severity, and description.
- Critical reports must trigger officer/supervisor notification immediately.
- Only officers, supervisors, and admins can change report status.
- Only supervisors and admins can close high or critical incidents.
- Status changes must create timeline events.
- Reports cannot move directly from `pending_review` to `closed`; they must pass through a review or resolution path.
- Resolved reports require a resolution summary.
- Critical alerts must display above informational alerts.
- Users can only view their own reports unless their role grants broader access.
- Audit logs must be append-only.

---

## 17. Status Workflow

```text
pending_review
  -> assigned
  -> in_progress
  -> awaiting_verification
  -> resolved
  -> closed

pending_review
  -> rejected

resolved
  -> in_progress
```

### Status Meaning

| Status | Meaning |
| --- | --- |
| `pending_review` | New report awaiting officer/supervisor review. |
| `assigned` | Report has been assigned to an officer or unit. |
| `in_progress` | Officer is actively investigating or resolving the hazard. |
| `awaiting_verification` | Resolution evidence has been submitted and awaits review. |
| `resolved` | Hazard has been handled and reporter can see completion. |
| `closed` | Supervisor/admin has finalized the case. |
| `rejected` | Report was invalid, duplicate, or outside scope. |

---

## 18. UI Implementation Guidelines

### Shared Layout Components

- `AppShell`: root authenticated layout.
- `DesktopSidebar`: condensed/expanded left navigation.
- `MobileBottomNav`: Dashboard, Report, Alerts.
- `TopBar`: search, notifications, profile, alerts shortcut.
- `GlassPanel`: reusable glassmorphic surface.
- `MetricCard`: KPI value, label, trend, icon.
- `SeverityChip`: status/severity label with semantic color.
- `IncidentCard`: report summary and primary action.
- `Timeline`: vertical incident progress list.
- `EvidenceUploader`: photo/document upload zone.
- `AlertCard`: campus alert display.

### Screen-Level UI Notes

#### My Safety Dashboard

- Mobile-first screen for students and staff.
- Shows total reports, resolved cases, active reports, recent activity, and a floating new-report button.
- Bottom navigation must keep Report as a central high-value action.

#### Report Hazard

- Must exist in both desktop and mobile layouts.
- Desktop uses a wider form with recent activity panel.
- Mobile uses fast category tiles, location input, evidence upload, risk selector, and details textarea.
- Submit button must be green and visually dominant.

#### Officer Command Center

- Desktop-first operational dashboard.
- Must show active hazards, resolved count, average response time, filters, incident cards, heat map, and urgent protocols.
- Critical incidents use red accents and high-priority action buttons.

#### Incident Details and Timeline

- Shows tracking ID, severity, location, timeline events, evidence, and resolution form.
- Resolution form must include final disposition summary, optional safety measurements, post-cleanup proof, and compliance signoff.

#### Campus Alerts

- Mobile-first alert feed.
- Critical alerts must be visually larger and more prominent.
- Emergency assistance action should remain clear and reachable.

#### Analytics and Compliance Audit

- Desktop-first executive screen.
- Must show compliance score, active hazards, response time, annual audit progress, incident trends, campus hotspots, department efficiency, and audit observations.
- Include export action for audit data.

---

## 19. Data Flow

### Hazard Submission Flow

```text
User Form
  -> Frontend Validation
  -> POST /api/reports
  -> Backend Validation
  -> Create hazard_reports row
  -> Upload evidence_files if provided
  -> Create incident_timeline_events row
  -> Create officer notifications
  -> Return tracking code
  -> Update reporter dashboard
```

### Incident Status Flow

```text
Officer Action
  -> Permission Check
  -> Validate Status Transition
  -> Update hazard_reports.status
  -> Create timeline event
  -> Create reporter notification
  -> Refresh command center and tracker views
```

### Analytics Flow

```text
Report and Timeline Data
  -> Aggregation Query or Scheduled Summary
  -> Analytics API
  -> Metric Cards, Trend Charts, Hotspots, Audit Tables
  -> Optional CSV/PDF Export
```

---

## 20. Validation Rules

### Registration

- Email must be valid and unique.
- Password must meet minimum length and complexity requirements.
- Role must be valid.
- Profile image must be an accepted image type if provided.

### Hazard Report

- Title: required, 5 to 120 characters.
- Category: required and active.
- Location: required as text or selected campus location.
- Severity: required.
- Description: required, 20 to 2000 characters.
- Evidence: optional, allowed file types only.

### Resolution

- Final disposition summary is required.
- Compliance signoff is required before status can become `resolved`.
- High and critical incidents require supervisor approval before `closed`.

---

## 21. Testing Strategy

### Unit Tests

- Validate role permission helpers.
- Validate status transition rules.
- Validate severity-to-color mapping.
- Validate form schema rules.
- Validate analytics aggregation helpers.

### Integration Tests

- User registration and login.
- Hazard report creation with and without evidence.
- Officer assignment and status update.
- Resolution submission and supervisor approval.
- Campus alert creation and notification delivery.
- Analytics endpoints with filtered data.

### UI Tests

- Mobile hazard report form submits valid data.
- Mobile dashboard displays active reports and recent activity.
- Incident tracker reflects timeline updates.
- Officer command center filters incidents correctly.
- Analytics page shows KPI cards and export action.

### Security Tests

- Student cannot view another user's report.
- Suspended user cannot log in.
- Regular user cannot assign officers.
- File upload rejects invalid types.
- Critical status changes are audit logged.

### Acceptance Tests

- A student can submit a high-severity hazard and receive a tracking ID.
- An officer can accept the incident, update the timeline, and submit a resolution.
- A supervisor can approve closure of a critical incident.
- An admin can export an audit report.
- A user can view active campus alerts on mobile.

---

## 22. Deployment Plan

### Development

- Local frontend development server.
- Local backend API server.
- Local MySQL database.
- Seed data for users, roles, locations, categories, reports, and alerts.

### Staging

- Hosted staging environment for user acceptance testing.
- Test database with anonymized/demo data.
- Upload storage configured with size limits.
- Email or in-app notification testing enabled.

### Production

- HTTPS enabled.
- Production MySQL database with backups.
- File storage with restricted public access.
- Environment variables for secrets.
- Monitoring for API errors and failed uploads.
- Scheduled backups for database and evidence metadata.

---

## 23. Implementation Phases

### Phase 1: Foundation

- Project setup.
- Design tokens from `UI_DESIGN/DESIGN.md`.
- Authentication.
- Role-based layout shell.
- Core database schema.

### Phase 2: Reporting

- Mobile and desktop hazard report forms.
- Evidence upload.
- User dashboard.
- Tracking ID generation.
- Basic notifications.

### Phase 3: Officer Workflow

- Officer command center.
- Incident filtering.
- Assignment.
- Status workflow.
- Incident timeline.
- Resolution form.

### Phase 4: Alerts and Administration

- Campus alert management.
- Admin management of users, categories, and locations.
- Notification center.
- Audit logs.

### Phase 5: Analytics and Compliance

- KPI dashboards.
- Trend charts.
- Hotspot analytics.
- Department efficiency.
- Audit observations.
- Export reports.

### Phase 6: Hardening

- Security testing.
- Performance optimization.
- Accessibility review.
- Backup and deployment automation.
- User acceptance testing.

---

## 24. Acceptance Criteria

The project is successful when:

- Users can create accounts and log in securely.
- Students and staff can submit hazard reports from mobile and desktop layouts.
- Reports generate unique tracking IDs.
- Officers can view, filter, assign, update, and resolve incidents.
- Reporters can track progress from dashboard and incident tracker screens.
- Admins can publish campus alerts.
- Critical alerts and incidents use the correct visual priority.
- Analytics reflect actual report and timeline data.
- Audit exports can be generated.
- The UI follows the dark clinical glassmorphic pattern in `UI_DESIGN/`.
- Role permissions prevent unauthorized access.

---

## 25. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Users submit incomplete or unclear reports. | Officers cannot respond efficiently. | Require structured fields, location, severity, and evidence prompts. |
| Critical reports are missed. | Safety response may be delayed. | Use priority notifications, command-center counters, and red critical styling. |
| Evidence uploads are too large or unsafe. | Performance and security issues. | Enforce file type, size limits, and server-side validation. |
| Manual processes continue outside the app. | Data remains fragmented. | Provide training and make reports/audits depend on system records. |
| Analytics become slow as data grows. | Poor admin experience. | Add indexes and summary tables for dashboards. |
| Role permissions are misconfigured. | Privacy or operational risk. | Centralize authorization checks and test role boundaries. |

---

## 26. Future Enhancements

- Native mobile app for offline-first reporting.
- Push notifications through Firebase or equivalent.
- GIS-based hazard mapping.
- QR codes placed around campus for location-aware reporting.
- Integration with campus maintenance systems.
- Integration with national or state environmental health agencies.
- Anonymous reporting with abuse prevention.
- SLA tracking and escalation rules.
- Predictive risk scoring based on recurring incident patterns.

---

## 27. Design Prompt Appendix

Use these prompts when creating additional screens so they remain consistent with the provided UI folder.

### Campus User Dashboard Prompt

Create a mobile-first COOU Campus Safe dashboard using the Clinical Clarity & Safety design system. Use a deep slate background, glassmorphic panels, Outfit headings, Inter body text, forest green action states, amber warning states, and crimson critical alerts. Show personal safety impact metrics, active reports, recent activity, and a floating new-report action. Use bottom navigation for Dashboard, Report, and Alerts.

### Hazard Report Prompt

Create a responsive hazard reporting screen for COOU EHS. The form must include hazard category, exact location, evidence upload, severity selector, and detailed description. Use glass panels, green focus states, rounded inputs, Material Symbols icons, and a dominant green submit button. Mobile should use category tiles and a compact risk selector. Desktop should use a wider two-column layout with recent activity.

### Officer Command Center Prompt

Create a desktop EHS officer command center with a condensed expandable sidebar, top navigation, search, notification actions, filtering panel, KPI cards, active incident feed, campus heat map, and urgent protocols. Use dark clinical glassmorphism, dense operational data cards, red critical actions, amber warning actions, and green stable/success actions.

### Incident Timeline Prompt

Create an incident detail page for COOU EHS showing the tracking ID, severity, category, location, reporter metadata, timeline events, evidence, resolution form, officer notes, and compliance signoff. Use a split desktop layout, vertical timeline, green active progress markers, and glassmorphic resolution panels.

### Analytics and Audit Prompt

Create an executive analytics and compliance audit screen for COOU EHS. Show compliance score, active hazards, average response time, annual audit progress, incident trends, campus hotspots, department efficiency, recent audit observations, and export audit action. Use dark clinical panels, tabular numeric display, and high-density dashboard spacing.

