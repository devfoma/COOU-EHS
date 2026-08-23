import React, { useState } from 'react';
import { Search, MapPin, Clock3, ClipboardCheck, UserCircle, FileText } from 'lucide-react';
import { MetricMini } from '../common/Metrics';
import GuideTip from '../common/GuideTip';
import SeverityChip from '../common/SeverityChip';
import { seesOwnReportsOnly } from '../../lib/access';

export default function MyReports({ reports, role, compact = false, searchQuery: controlledSearchQuery, onSearchQueryChange }) {
  const ownsOnly = seesOwnReportsOnly(role);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const searchQuery = controlledSearchQuery ?? localSearchQuery;
  const setSearchQuery = onSearchQueryChange || setLocalSearchQuery;
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredReports = (reports || []).filter((report) => {
    if (!normalizedSearch) return true;

    return [
      report.id,
      report.title,
      report.description,
      report.category,
      report.location,
      report.status,
      report.severity,
      report.reporter,
      report.reporter_name,
      report.assignedTo,
      report.assigned_to
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedSearch));
  });
  const activeReports = filteredReports.filter((report) => report.status !== 'Resolved' && report.status !== 'Closed');
  const resolvedReports = filteredReports.filter((report) => report.status === 'Resolved' || report.status === 'Closed');
  const reportTitle = ownsOnly ? 'My Reports' : role === 'staff' ? 'Campus Reports' : 'Report Records';
  const reportGuide = ownsOnly
    ? 'This tab keeps the hazard reports you submitted in one place so you can follow status, location, severity, and progress.'
    : 'This tab shows campus hazard reports visible to your role. Use search to find student or staff submissions by ID, title, location, status, or severity.';

  return (
    <div className={compact ? 'mobile-screen my-reports-compact' : 'screen my-reports-screen'}>
      <section className={compact ? 'mobile-hero' : 'page-heading full'}>
        <div>
          <p className="eyebrow">{ownsOnly ? 'Submitted by you' : role === 'staff' ? 'Campus submissions' : 'Report records'}</p>
          <h1>
            {reportTitle}
            <GuideTip title={`${reportTitle} guide`}>{reportGuide}</GuideTip>
          </h1>
          <p>
            {ownsOnly
              ? 'Track the hazards you have submitted and follow their response status.'
              : role === 'staff'
                ? 'Review student and staff hazard reports, search the list, and submit your own report when you notice a new issue.'
                : 'Review submitted reports available to your role.'}
          </p>
        </div>
      </section>

      <div className="my-report-summary">
        <MetricMini value={String(filteredReports.length)} label={ownsOnly ? 'All Reports' : 'Visible Reports'} guide="Total reports visible in this tab." />
        <MetricMini value={String(activeReports.length)} label="Active" guide="Reports still waiting for review, assignment, or resolution." />
        <MetricMini value={String(resolvedReports.length)} label="Resolved" guide="Reports marked resolved or closed after response work." />
      </div>

      {!ownsOnly && (
        <section className="report-search-panel glass-panel">
          <label className="search-box">
            <Search size={16} />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by title, ID, student, location, status..."
            />
          </label>
          {normalizedSearch && (
            <button className="ghost-button" type="button" onClick={() => setSearchQuery('')}>
              Clear
            </button>
          )}
          <p>{normalizedSearch ? `Showing ${filteredReports.length} of ${(reports || []).length} reports.` : 'Search campus reports by title, report ID, reporter, location, severity, or status.'}</p>
        </section>
      )}

      <section className="my-report-list">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <article key={report.id} className={`glass-panel my-report-row ${report.severity}`}>
              <div>
                <SeverityChip severity={report.severity} />
                <span className="report-code">{report.id}</span>
              </div>
              <h2>{report.title}</h2>
              <p>{report.description}</p>
              <div className="incident-meta">
                <span><MapPin size={15} />{report.location}</span>
                <span><Clock3 size={15} />{report.time}</span>
                <span><ClipboardCheck size={15} />{report.status}</span>
                {!ownsOnly && <span><UserCircle size={15} />{report.reporter || report.reporter_name || 'Campus user'}</span>}
              </div>
            </article>
          ))
        ) : (
          <div className="mobile-empty-state glass-panel">
            <FileText size={24} />
            <h3>{normalizedSearch ? 'No matching reports' : 'No reports yet'}</h3>
            <p>{normalizedSearch ? 'Try another title, location, status, severity, or report ID.' : 'Once a hazard report is submitted, it will appear in this tab for tracking.'}</p>
          </div>
        )}
      </section>
    </div>
  );
}
