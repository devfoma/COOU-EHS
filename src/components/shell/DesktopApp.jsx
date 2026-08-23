import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, AlertTriangle, Siren, BarChart3, Settings, Search, Bell, UserCircle, ShieldCheck, X } from 'lucide-react';
import Brand from '../common/Brand';
import AccessBadge from '../common/AccessBadge';
import { Protected, defaultDesktopViewByRole, hasAccess, canUseOperationalSearch, seesOwnReportsOnly } from '../../lib/access';
import CommandCenter from '../dashboards/CommandCenter';
import MyReports from '../dashboards/MyReports';
import ReportHazard from '../dashboards/ReportHazard';
import IncidentTimeline from '../dashboards/IncidentTimeline';
import Analytics from '../dashboards/Analytics';
import ProfileModal from '../common/ProfileModal';
import SettingsPanel from '../dashboards/SettingsPanel';

export function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick} type="button">
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}

export default function DesktopApp({ view, setView, metrics, activeIncident, session, onLogout, incidentsList, alertsList, activityList, refreshData, onReportCreated }) {
  const role = session.role;
  const [profileOpen, setProfileOpen] = useState(false);
  const [reportSearchQuery, setReportSearchQuery] = useState('');
  const reportsLabel = seesOwnReportsOnly(role) ? 'My Reports' : role === 'staff' ? 'Campus Reports' : 'Reports';
  const desktopViews = [
    { id: 'command', label: 'Dashboard', icon: LayoutDashboard, permission: 'incident:assigned' },
    { id: 'myReports', label: reportsLabel, icon: FileText, permission: 'report:own' },
    { id: 'report', label: 'Hazard Reports', icon: AlertTriangle, permission: 'report:create' },
    { id: 'emergency', label: 'Emergency', icon: Siren, permission: 'alerts:view', fallbackPermission: 'alerts:manage' },
    { id: 'timeline', label: 'Incident Timeline', icon: FileText, permission: 'incident:resolve' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, permission: 'analytics:view' },
    { id: 'settings', label: 'Settings', icon: Settings, permission: 'report:own' }
  ].filter((item) => hasAccess(role, item.permission) || (item.fallbackPermission && hasAccess(role, item.fallbackPermission)) || (item.id === 'command' && hasAccess(role, 'incident:all')));
  const allowedViewIds = desktopViews.map((item) => item.id);

  useEffect(() => {
    if (!allowedViewIds.includes(view)) {
      setView(defaultDesktopViewByRole[role] || allowedViewIds[0] || 'report');
    }
  }, [allowedViewIds, role, setView, view]);

  const activeView = allowedViewIds.includes(view) ? view : (defaultDesktopViewByRole[role] || allowedViewIds[0]);

  return (
    <section className="desktop-app">
      <aside className="sidebar">
        <Brand compact />
        <nav>
          {desktopViews.filter(item => item.id !== 'emergency').map((item) => (
            <NavButton key={item.id} icon={item.icon} label={item.label} active={activeView === item.id} onClick={() => setView(item.id)} />
          ))}
        </nav>
        <button
          className={`emergency-button ${activeView === 'emergency' ? 'active' : ''}`}
          type="button"
          onClick={() => setView('emergency')}
        >
          <Siren size={18} />
          <span className="button-label">Emergency</span>
        </button>
      </aside>

      <div className="desktop-main">
        <header className="topbar">
          <Brand />
          <div className="desktop-tabs">
            {desktopViews.filter(item => item.id !== 'emergency').slice(0, 3).map((item) => (
              <button key={item.id} className={activeView === item.id ? 'active' : ''} onClick={() => setView(item.id)}>{item.label}</button>
            ))}
          </div>
          <div className="topbar-actions">
            {canUseOperationalSearch(role) && activeView === 'myReports' && (
              <label className="search-box">
                <Search size={16} />
                <input
                  value={reportSearchQuery}
                  onChange={(event) => setReportSearchQuery(event.target.value)}
                  placeholder="Search reports by title, ID, location..."
                />
              </label>
            )}
            <AccessBadge role={role} />
            <button className="icon-button" aria-label="Notifications"><Bell size={20} /></button>
            <button className="icon-button" aria-label="Open profile" onClick={() => setProfileOpen(true)}><UserCircle size={20} /></button>
          </div>
        </header>

        {activeView === 'command' && <Protected permission="incident:assigned" role={role} fallbackPermission="incident:all"><CommandCenter metrics={metrics} role={role} incidentsList={incidentsList} /></Protected>}
        {activeView === 'myReports' && (
          <Protected permission="report:own" role={role}>
            <MyReports
              reports={incidentsList}
              role={role}
              searchQuery={reportSearchQuery}
              onSearchQueryChange={setReportSearchQuery}
            />
          </Protected>
        )}
        {activeView === 'report' && <Protected permission="report:create" role={role}><ReportHazard session={session} activityList={activityList} refreshData={refreshData} onReportCreated={onReportCreated} /></Protected>}
        {activeView === 'timeline' && <Protected permission="incident:resolve" role={role}><IncidentTimeline incident={activeIncident} role={role} refreshData={refreshData} /></Protected>}
        {activeView === 'analytics' && <Protected permission="analytics:view" role={role}><Analytics metrics={metrics} role={role} /></Protected>}
        {activeView === 'settings' && <Protected permission="report:own" role={role}><SettingsPanel session={session} refreshData={refreshData} /></Protected>}
      </div>
      {profileOpen && <ProfileModal session={session} onClose={() => setProfileOpen(false)} onLogout={onLogout} onEditProfile={() => setView('settings')} />}
    </section>
  );
}
