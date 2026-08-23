import React from 'react';

export const roles = {
  student: {
    label: 'Student',
    description: 'Submit hazards, track your own reports, and receive campus alerts.',
    permissions: ['report:create', 'report:own', 'alerts:view']
  },
  staff: {
    label: 'Staff',
    description: 'Report workplace hazards and review campus safety submissions from students and staff.',
    permissions: ['report:create', 'report:own', 'report:campus', 'alerts:view']
  },
  admin: {
    label: 'Admin',
    description: 'Review reports, coordinate response, manage alerts, track analytics, and close incidents.',
    permissions: ['report:create', 'incident:assigned', 'incident:all', 'incident:resolve', 'incident:assign', 'alerts:view', 'alerts:manage', 'analytics:view', 'admin:manage', 'protocols:view']
  }
};

export const defaultDesktopViewByRole = {
  student: 'myReports',
  staff: 'myReports',
  admin: 'command'
};

export const defaultMobileViewByRole = {
  student: 'dashboard',
  staff: 'dashboard',
  admin: 'dashboard'
};

const roleAliases = {
  officer: 'admin',
  supervisor: 'admin',
  administrator: 'admin',
  management: 'admin'
};

export const selfServiceRoles = ['student'];

export function normalizeRole(role) {
  const normalizedRole = roleAliases[role] || role;
  return roles[normalizedRole] ? normalizedRole : 'student';
}

export function normalizeSelfServiceRole(role) {
  return selfServiceRoles.includes(role) ? role : 'student';
}

export function hasAccess(role, permission) {
  return roles[role]?.permissions.includes(permission) || false;
}

export function canUseOperationalSearch(role) {
  return hasAccess(role, 'report:campus') || hasAccess(role, 'incident:assigned') || hasAccess(role, 'incident:all') || hasAccess(role, 'analytics:view');
}

export function seesOwnReportsOnly(role) {
  return hasAccess(role, 'report:own') && !canUseOperationalSearch(role);
}

export function Protected({ role, permission, fallbackPermission, children }) {
  if (hasAccess(role, permission) || (fallbackPermission && hasAccess(role, fallbackPermission))) {
    return children;
  }

  return <RestrictedScreen role={role} permission={permission} />;
}

function RestrictedScreen({ role, permission }) {
  return (
    <div className="screen restricted-screen">
      <section className="page-heading full">
        <div>
          <p className="eyebrow">Access restricted</p>
          <h1>Access is limited for {roles[role]?.label || role}</h1>
          <p>This screen requires the permission `{permission}`. Sensitive EHS operational data is hidden unless the signed-in role needs it.</p>
        </div>
      </section>
    </div>
  );
}
