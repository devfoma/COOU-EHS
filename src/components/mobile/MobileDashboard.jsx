import React from 'react';
import { FileText } from 'lucide-react';
import GuideTip from '../common/GuideTip';
import { MetricMini } from '../common/Metrics';
import { seesOwnReportsOnly } from '../../lib/access';
import { MobileReportCard } from './MobileReport';

export default function MobileDashboard({ incidentsList, activityList, role }) {
  const ownsOnly = seesOwnReportsOnly(role);
  const totalReports = incidentsList.length;
  const resolvedReports = incidentsList.filter(i => i.status === 'Resolved').length;
  const latestReports = (incidentsList || []).slice(0, 2);

  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">My safety impact</p>
        <h1>
          {ownsOnly ? 'My Safety Dashboard' : 'Campus Dashboard'}
          <GuideTip title="Dashboard guide">
            Use this screen to check your submitted reports, resolved cases, recent updates, and the next safety action you may need to take.
          </GuideTip>
        </h1>
      </section>
      <div className="mobile-metrics">
        <MetricMini value={String(totalReports)} label={ownsOnly ? 'My Reports' : 'Total Reports'} />
        <MetricMini value={String(resolvedReports)} label="Resolved Cases" />
      </div>
      <div className="section-title">
        <h2>
          {ownsOnly ? 'Latest Reports' : 'Active Reports'}
          <GuideTip title="Report list">
            These are the newest reports visible to your role. Students only see reports they submitted, while staff can review campus submissions.
          </GuideTip>
        </h2>
      </div>
      {latestReports.length > 0 ? (
        latestReports.map((incident) => <MobileReportCard key={incident.id} incident={incident} />)
      ) : (
        <div className="mobile-empty-state glass-panel">
          <FileText size={24} />
          <h3>No reports yet</h3>
          <p>Reports you submit will appear here with their latest response status.</p>
        </div>
      )}
      <div className="section-title">
        <h2>
          Recent Activity
          <GuideTip title="Activity updates">
            Activity entries show report submissions, response updates, and system notes relevant to your dashboard.
          </GuideTip>
        </h2>
      </div>
      <div className="mobile-activity glass-panel">
        {(activityList || []).slice(0, 3).map((item, idx) => <p key={idx}>{item}</p>)}
      </div>
    </div>
  );
}
