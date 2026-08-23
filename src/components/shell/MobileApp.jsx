import React, { useState, useEffect } from 'react';
import { Home, FileText, Plus, ClipboardCheck, Bell, UserCircle, Siren } from 'lucide-react';
import Brand from '../common/Brand';
import AccessBadge from '../common/AccessBadge';
import { Protected, defaultMobileViewByRole, hasAccess, seesOwnReportsOnly } from '../../lib/access';
import MobileDashboard from '../mobile/MobileDashboard';
import MyReports from '../dashboards/MyReports';
import MobileReport from '../mobile/MobileReport';
import MobileTracker from '../mobile/MobileTracker';
import MobileAlerts from '../mobile/MobileAlerts';
import ProfileModal from '../common/ProfileModal';
import SettingsPanel from '../dashboards/SettingsPanel';
import EmergencyCenter from '../dashboards/EmergencyCenter';

export function MobileNavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={active ? 'active' : ''} onClick={onClick} type="button">
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}

export default function MobileApp({ view, setView, activeIncident, session, onLogout, incidentsList, alertsList, activityList, refreshData, onReportCreated }) {
  const role = session.role;
  const [profileOpen, setProfileOpen] = useState(false);
  const reportsLabel = seesOwnReportsOnly(role) ? 'My Reports' : role === 'staff' ? 'Campus' : 'Reports';
  const mobileViews = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, permission: 'report:own', fallbackPermission: 'incident:all' },
    { id: 'myReports', label: reportsLabel, icon: FileText, permission: 'report:own' },
    { id: 'report', label: 'Report', icon: Plus, permission: 'report:create' },
    { id: 'emergency', label: 'Emergency', icon: Siren, permission: 'alerts:view', fallbackPermission: 'alerts:manage' },
    { id: 'tracker', label: 'Tracker', icon: ClipboardCheck, permission: 'report:own', fallbackPermission: 'incident:resolve' },
    { id: 'alerts', label: 'Alerts', icon: Bell, permission: 'alerts:view', fallbackPermission: 'alerts:manage' }
  ].filter((item) => hasAccess(role, item.permission) || (item.fallbackPermission && hasAccess(role, item.fallbackPermission)));
  const allowedViewIds = mobileViews.map((item) => item.id);

  useEffect(() => {
    if (!allowedViewIds.includes(view) && view !== 'settings') {
      setView(defaultMobileViewByRole[role] || allowedViewIds[0] || 'alerts');
    }
  }, [allowedViewIds, role, setView, view]);

  const activeView = (allowedViewIds.includes(view) || view === 'settings') ? view : (defaultMobileViewByRole[role] || allowedViewIds[0]);

  return (
    <section className="mobile-app">
      <header className="mobile-header">
        <Brand />
        <AccessBadge role={role} />
        <button className="icon-button" aria-label="Open profile" onClick={() => setProfileOpen(true)}><UserCircle size={20} /></button>
      </header>

      {activeView === 'dashboard' && <Protected role={role} permission="report:own" fallbackPermission="incident:all"><MobileDashboard incidentsList={incidentsList} activityList={activityList} role={role} /></Protected>}
      {activeView === 'myReports' && <Protected role={role} permission="report:own"><MyReports reports={incidentsList} role={role} compact /></Protected>}
      {activeView === 'report' && <Protected role={role} permission="report:create"><MobileReport session={session} refreshData={refreshData} onReportCreated={onReportCreated} /></Protected>}
      {activeView === 'emergency' && <Protected role={role} permission="alerts:view" fallbackPermission="alerts:manage"><EmergencyCenter session={session} incidentsList={incidentsList} alertsList={alertsList} refreshData={refreshData} onReportCreated={onReportCreated} compact /></Protected>}
      {activeView === 'tracker' && <Protected role={role} permission="report:own" fallbackPermission="incident:resolve"><MobileTracker incident={activeIncident} /></Protected>}
      {activeView === 'alerts' && <Protected role={role} permission="alerts:view" fallbackPermission="alerts:manage"><MobileAlerts role={role} alertsList={alertsList} setView={setView} /></Protected>}
      {activeView === 'settings' && <Protected role={role} permission="report:own"><SettingsPanel session={session} refreshData={refreshData} /></Protected>}

      <nav className="mobile-nav">
        {mobileViews.map((item) => (
          <MobileNavButton key={item.id} icon={item.icon} label={item.label} active={activeView === item.id} onClick={() => setView(item.id)} />
        ))}
      </nav>
      {profileOpen && <ProfileModal session={session} onClose={() => setProfileOpen(false)} onLogout={onLogout} onEditProfile={() => setView('settings')} />}
    </section>
  );
}
