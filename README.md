# COUU-EHS

COUU-EHS is a responsive Environmental Health and Safety Application System for Chukwuemeka Odumegwu Ojukwu University (COOU). The project provides a digital platform for reporting campus hazards, tracking incident response, publishing safety alerts, and reviewing EHS performance analytics.

The application was built from the project seminar brief in `Okechukwu_Christian_Seminar.md` and follows the visual direction in the `UI_DESIGN/` folder. The current implementation is a frontend prototype with realistic mock data, designed to demonstrate both the web and mobile use cases of the system.

## Project Purpose

Many university environmental health and safety processes are still handled manually through paper records, verbal reports, or disconnected departmental channels. This can cause delayed responses, poor documentation, weak accountability, and limited insight into recurring safety risks.

COUU-EHS addresses these problems by centralizing EHS reporting and response workflows in one system. Students and staff can quickly report hazards, while EHS officers and administrators can monitor, prioritize, assign, resolve, and audit safety incidents.

## Key Use Cases Implemented

### 1. Campus User Safety Dashboard

The mobile dashboard gives students and staff a simple view of their safety activity.

Implemented features:

- Total reports submitted.
- Resolved case count.
- Active report cards.
- Recent activity feed.
- Mobile-first bottom navigation.

This use case supports students and staff who need quick visibility into the hazards they have reported and the progress made by the EHS team.

### 2. Hazard Reporting

The hazard reporting workflow allows a campus user to submit a safety issue with structured details.

Implemented features:

- Hazard category selection.
- Location input.
- Evidence upload area.
- Risk/severity selector.
- Incident description field.
- Submit hazard report action.

Desktop and mobile versions are implemented. The mobile flow is optimized for fast field reporting, while the desktop flow provides a fuller form layout.

Example hazards supported by the interface:

- Waste management issues.
- Infrastructure defects.
- Electrical hazards.
- Fire safety risks.
- Laboratory or biological risks.
- Sanitation concerns.

### 3. Incident Tracking

The incident tracker shows the progress of a submitted report from creation to resolution.

Implemented features:

- Incident ID display.
- Risk and category summary.
- Resolution progress timeline.
- Status steps such as Reported, Assigned, In Progress, and Resolved.
- Notification and sharing actions.

This use case helps reporters stay informed and reduces the need for manual follow-up.

### 4. Campus Alerts

The campus alerts screen communicates urgent and routine safety notices.

Implemented features:

- Critical alert cards.
- Warning alert cards.
- Informational/safe status alerts.
- Location and active time labels.
- Immediate assistance call-to-action.

This use case supports emergency communication during incidents such as chemical spills, power outages, blocked emergency exits, or sanitation drills.

### 5. EHS Officer Command Center

The desktop command center supports EHS officers and supervisors who manage active incidents.

Implemented features:

- Active hazard KPI cards.
- Resolved today metric.
- Average response time metric.
- Incident filter panel.
- Active incident feed.
- Severity-based incident cards.
- Campus heat map placeholder.
- Urgent protocol shortcuts.

This use case is intended for operational safety teams who need a real-time overview of campus risks and response activity.

### 6. Incident Timeline and Resolution

The incident detail view supports officers as they document response actions and close out incidents.

Implemented features:

- Incident tracking ID.
- Severity chip.
- Resolution timeline.
- Final disposition summary field.
- Safety measurement fields such as air quality and surface pH.
- Post-cleanup evidence upload area.
- Compliance signoff checkbox.
- Submit resolution action.

This use case models the accountability trail needed for safety documentation and audit readiness.

### 7. Analytics and Compliance Audit

The analytics screen gives administrators and management a high-level view of safety performance.

Implemented features:

- Compliance score.
- Active hazards count.
- Average response time.
- Annual audit progress.
- Incident trend visualization.
- Audit observations.
- Export audit action.

This use case supports institutional decision-making, compliance reporting, and identification of recurring hazard hotspots.

## Design Implementation

The UI follows the `Clinical Clarity & Safety` design system provided in `UI_DESIGN/DESIGN.md`.

Design characteristics:

- Dark clinical/corporate interface.
- Glassmorphism-inspired panels.
- High-contrast readable text.
- Green for safety and positive action.
- Amber for warnings.
- Red for critical hazards.
- Dense desktop dashboards for officers/admins.
- Streamlined mobile workflows for students and staff.

The app header/sidebar logo is loaded from the cropped mark:

```text
ASSETS/COOU-EHS LOGO MARK.png
```

The original full logo with text is also kept in `ASSETS/COOU-EHS LOGO.png`.

The visible application brand name is:

```text
COUU-EHS
```

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Lucide React icons

The implementation currently uses local mock data in the frontend. It does not yet include a database, authentication server, or production backend API.

## Project Structure

```text
.
|-- ASSETS/
|   |-- COOU-EHS LOGO MARK.png
|   `-- COOU-EHS LOGO.png
|-- UI_DESIGN/
|   |-- DESIGN.md
|   |-- ehs_officer_command_center/
|   |-- incident_details_timeline/
|   |-- mobile_campus_alerts/
|   |-- mobile_incident_tracker/
|   |-- mobile_my_safety_dashboard/
|   |-- mobile_report_a_hazard/
|   |-- report_a_hazard/
|   `-- safety_analytics_audits/
|-- src/
|   |-- main.jsx
|   `-- styles.css
|-- index.html
|-- package.json
|-- package-lock.json
|-- Okechukwu_Christian_Seminar.md
`-- TECHNICAL_DESIGN_DOCUMENT.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Current Frontend Behavior

The application is responsive:

- Desktop and tablet widths show the web/officer/admin experience.
- Mobile widths show the campus-user mobile experience.

The app includes interactive navigation between the implemented screens, but data is currently static mock data. Form submissions and buttons are visual demonstrations only and do not yet persist records.

## Future Backend Implementation

A complete production version should add:

- User authentication and role-based access.
- Hazard report API.
- Incident assignment workflow.
- Evidence upload storage.
- Campus alert publishing.
- Notification delivery.
- MySQL or PostgreSQL database.
- Audit logging.
- Analytics aggregation.
- Exportable PDF/CSV reports.

## Recommended User Roles

- Student: report hazards and track personal reports.
- Staff: report hazards and receive campus alerts.
- EHS Officer: manage assigned incidents and submit resolutions.
- EHS Supervisor: assign officers, approve closures, and publish alerts.
- Administrator: manage users, categories, locations, and system settings.
- Management: review analytics and audit reports.

## Documentation

Additional project documentation:

- `TECHNICAL_DESIGN_DOCUMENT.md`: full technical design document.
- `Okechukwu_Christian_Seminar.md`: original academic/project brief.
- `UI_DESIGN/DESIGN.md`: design system reference.
