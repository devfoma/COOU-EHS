import { useMemo } from 'react';
import { CheckCircle2, ClipboardCheck, Clock3, Siren } from 'lucide-react';
import { seesOwnReportsOnly } from './access';

export function getVisibleReportsForRole(reports, session) {
  if (!session || !seesOwnReportsOnly(session.role)) {
    return reports || [];
  }

  return (reports || []).filter((report) => {
    const reporterId = report.reporter_id || report.reporterId;
    return reporterId === session.userId;
  });
}

export function useDashboardModel({ appSession, incidentsList }) {
  const visibleIncidentsList = useMemo(
    () => getVisibleReportsForRole(incidentsList, appSession),
    [appSession, incidentsList]
  );

  const activeIncident = visibleIncidentsList[0] || (incidentsList || [])[0];

  const metrics = useMemo(() => {
    const activeCount = visibleIncidentsList.filter((incident) => incident.status !== 'Resolved' && incident.status !== 'Closed').length;
    const resolvedCount = visibleIncidentsList.filter((incident) => incident.status === 'Resolved' || incident.status === 'Closed').length;

    return [
      { label: 'Active Hazards', value: String(activeCount), trend: '+3 today', tone: 'critical', icon: Siren },
      { label: 'Resolved Today', value: String(resolvedCount), trend: '+18%', tone: 'safe', icon: CheckCircle2 },
      { label: 'Avg. Response', value: '04:12', trend: '22 min faster', tone: 'neutral', icon: Clock3 },
      { label: 'Compliance', value: '94.8%', trend: 'Annual score', tone: 'safe', icon: ClipboardCheck }
    ];
  }, [visibleIncidentsList]);

  return {
    visibleIncidentsList,
    activeIncident,
    metrics
  };
}
