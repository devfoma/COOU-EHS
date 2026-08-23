'use client';

import React, { useState } from 'react';
import { useRequireAuth } from '../../lib/auth';
import { useCampusSafety } from '../../lib/CampusSafetyProvider';
import { defaultDesktopViewByRole, defaultMobileViewByRole } from '../../lib/access';
import { useDashboardModel } from '../../lib/dashboardModel';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';

export default function DashboardRoute({ allowedRole = null, initialDesktopView, initialMobileView }) {
  const { appSession, authLoading } = useRequireAuth(allowedRole);
  const {
    incidentsList,
    alertsList,
    activityList,
    loading,
    refreshData,
    handleReportCreated,
    handleLogout
  } = useCampusSafety();

  const [desktopView, setDesktopView] = useState(initialDesktopView || defaultDesktopViewByRole[allowedRole] || 'myReports');
  const [mobileView, setMobileView] = useState(initialMobileView || defaultMobileViewByRole[allowedRole] || 'dashboard');
  const { visibleIncidentsList, activeIncident, metrics } = useDashboardModel({ appSession, incidentsList });

  if (authLoading || !appSession) {
    return <div className="loading-banner">Verifying campus security session...</div>;
  }

  return (
    <main className="app-shell">
      {loading && <div className="loading-banner">Loading real-time campus safety data...</div>}
      <DesktopApp
        view={desktopView}
        setView={setDesktopView}
        metrics={metrics}
        activeIncident={activeIncident}
        session={appSession}
        onLogout={handleLogout}
        incidentsList={visibleIncidentsList}
        alertsList={alertsList}
        activityList={activityList}
        refreshData={refreshData}
        onReportCreated={handleReportCreated}
      />
      <MobileApp
        view={mobileView}
        setView={setMobileView}
        activeIncident={activeIncident}
        session={appSession}
        onLogout={handleLogout}
        incidentsList={visibleIncidentsList}
        alertsList={alertsList}
        activityList={activityList}
        refreshData={refreshData}
        onReportCreated={handleReportCreated}
      />
    </main>
  );
}
