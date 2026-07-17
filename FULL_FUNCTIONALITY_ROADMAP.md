# Full Functionality Roadmap

This document lists the remaining work required to turn the current COUU-EHS frontend prototype into a fully functional production application.

## 1. Backend Application

Build a backend service to handle all business logic and persistence.

Required work:

- Create a REST or GraphQL API.
- Add environment-based configuration.
- Add request validation for every endpoint.
- Add centralized error handling.
- Add API versioning, for example `/api/v1`.
- Add structured logs for debugging and auditability.
- Add rate limiting for login, registration, and report submission.

Recommended stack options:

- Node.js with Express/NestJS.
- Laravel PHP API.
- PostgreSQL or MySQL database.

## 2. Authentication and Sessions

The current role selection is only a frontend demonstration. Production needs real identity management.

Required work:

- User registration.
- Secure login and logout.
- Password hashing with bcrypt, Argon2, or framework equivalent.
- Password reset flow.
- Session expiry.
- Secure cookies or JWT handling.
- Optional email verification.
- Optional two-factor authentication for officers/admins.

Access rules:

- Public users should not access operational screens or APIs.
- Students and staff should only see their own reports.
- Officers should only see assigned incidents unless promoted.
- Supervisors/admins should see wider operational data.
- Management should have read-only analytics access.

## 3. Role-Based Access Control

Frontend restrictions are not enough. The backend must enforce permissions.

Required work:

- Create roles: Student, Staff, EHS Officer, Supervisor, Administrator, Management.
- Create permissions for reporting, assignment, resolution, alerts, analytics, audit export, and user management.
- Check permissions inside every protected API endpoint.
- Add ownership checks so users cannot view other users' private reports.
- Add audit logs for permission-sensitive actions.

Important rule:

Never rely on hidden UI buttons as the only security control.

## 4. Database Schema

Create real database tables for the app.

Core tables:

- `users`
- `roles`
- `permissions`
- `departments`
- `locations`
- `hazard_categories`
- `hazard_reports`
- `incident_assignments`
- `incident_timeline_events`
- `evidence_files`
- `campus_alerts`
- `notifications`
- `resolution_records`
- `audit_logs`

Required work:

- Add migrations.
- Add seed data for roles, permissions, categories, and locations.
- Add indexes for status, severity, category, location, and date filtering.
- Add foreign key constraints.
- Add soft delete or archival strategy where appropriate.

## 5. Hazard Reporting Workflow

The report form currently does not save data.

Required work:

- Persist new hazard reports.
- Generate unique tracking IDs such as `HAZ-2904`.
- Validate category, location, severity, title, and description.
- Save reporter ownership.
- Save evidence metadata.
- Create initial timeline event.
- Notify EHS officers or supervisors after submission.
- Show success, failure, and loading states in the UI.

## 6. Evidence Uploads

Evidence uploads are currently visual only.

Required work:

- Add backend file upload endpoint.
- Validate file type and size.
- Store files outside public web roots.
- Use private object storage or protected local storage.
- Generate signed temporary URLs for viewing evidence.
- Link evidence files to reports and timeline events.
- Prevent executable or unsafe uploads.

## 7. Incident Assignment and Resolution

Officer workflows currently use mock data.

Required work:

- Assign reports to officers or units.
- Change statuses through valid transitions only.
- Add notes to incident timelines.
- Upload officer evidence and post-cleanup proof.
- Save resolution records.
- Require supervisor approval for high and critical incidents.
- Notify reporter when status changes.
- Close incidents only after required checks are complete.

Recommended status flow:

```text
pending_review
  -> assigned
  -> in_progress
  -> awaiting_verification
  -> resolved
  -> closed

pending_review
  -> rejected
```

## 8. Notifications and Alerts

Campus alerts and report notifications are currently static.

Required work:

- Add in-app notifications.
- Add notification read/unread states.
- Add alert publishing workflow for supervisors/admins.
- Add alert severity, location targeting, start time, and expiry.
- Add email notifications if required.
- Add push notifications if a native/mobile app is later built.

## 9. Analytics and Audit Reporting

Analytics currently use mock metrics.

Required work:

- Aggregate active hazards.
- Calculate average response time.
- Calculate resolved cases.
- Track compliance score.
- Show department response performance.
- Show top hazard categories and locations.
- Filter analytics by date range, department, location, status, and severity.
- Export CSV/PDF audit reports.
- Restrict analytics to admin and management roles.

## 10. Admin Management

Admin settings are not yet implemented.

Required work:

- User management.
- Role assignment.
- Department management.
- Campus location management.
- Hazard category management.
- Alert management.
- System settings.
- Audit log viewer.

## 11. Frontend Integration

The frontend currently uses local mock data.

Required work:

- Replace mock data with API calls.
- Add loading states.
- Add empty states.
- Add error states.
- Add form validation feedback.
- Add optimistic or confirmed update patterns for workflow actions.
- Add protected route handling.
- Persist session state securely.
- Hide or disable features based on backend permissions.

## 12. Testing

Required tests:

- Unit tests for permission checks.
- Unit tests for status transitions.
- API tests for authentication and authorization.
- API tests for report creation.
- API tests for assignment and resolution.
- Upload validation tests.
- UI tests for role-specific navigation.
- End-to-end tests for report submission to closure.
- Accessibility tests for forms, buttons, focus states, and contrast.

## 13. Security Hardening

Required work:

- HTTPS in production.
- Secure cookies or correctly scoped tokens.
- CSRF protection if cookie sessions are used.
- Input sanitization.
- SQL injection prevention through parameterized queries/ORM.
- XSS prevention.
- File upload scanning/validation.
- Rate limiting.
- Audit logs for sensitive actions.
- Data retention and backup policy.
- Role permission reviews before deployment.

## 14. Deployment

Required work:

- Choose hosting for frontend and backend.
- Configure production database.
- Configure environment variables.
- Configure private file storage.
- Set up CI build checks.
- Set up database backups.
- Set up error monitoring.
- Set up deployment documentation.

## 15. Immediate Next Steps

Recommended implementation order:

1. Build backend API foundation.
2. Add authentication and role-based access control.
3. Add database migrations and seed data.
4. Connect hazard report submission to the API.
5. Add evidence upload storage.
6. Add officer assignment and timeline updates.
7. Add campus alerts and notifications.
8. Replace dashboard mock data with analytics endpoints.
9. Add admin management screens.
10. Add tests and deployment setup.

