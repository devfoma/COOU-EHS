import React from 'react';
import { Filter, Download, MapPin, Clock3, Building2, Flame, Wrench, Activity, ChevronRight } from 'lucide-react';
import GuideTip from '../common/GuideTip';
import SeverityChip from '../common/SeverityChip';
import FieldLabel from '../common/FieldLabel';
import CheckRow from '../common/CheckRow';
import { MetricCard } from '../common/Metrics';

export function IncidentCard({ incident }) {
  const buttonText = incident.severity === 'critical' ? 'Take Action' : incident.severity === 'high' ? 'Assign Staff' : 'Clear Status';

  return (
    <article className={`incident-card glass-panel ${incident.severity}`}>
      <div className="incident-card-top">
        <SeverityChip severity={incident.severity} />
        <span>{incident.id}</span>
      </div>
      <h3>{incident.title}</h3>
      {incident.evidence_url && (
        <div className="incident-card-evidence" style={{ margin: '10px 0', borderRadius: '6px', overflow: 'hidden', maxHeight: '150px' }}>
          <img src={incident.evidence_url} alt="Evidence" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <p>{incident.description}</p>
      <div className="incident-meta">
        <span><MapPin size={15} />{incident.location}</span>
        <span><Clock3 size={15} />{incident.time}</span>
      </div>
      <div className="progress-line"><span style={{ width: `${incident.progress}%` }} /></div>
      <div className="incident-actions">
        <span>{incident.assignedTo}</span>
        <button>{buttonText}</button>
      </div>
    </article>
  );
}

export function CampusMap() {
  return (
    <section className="glass-panel campus-map">
      <h2>
        Campus Heat Map
        <GuideTip title="Heat map guide">
          Pins show where active risks are concentrated so admins can spot repeated problem areas.
        </GuideTip>
      </h2>
      <div className="map-box">
        <span className="pin pin-critical" />
        <span className="pin pin-high" />
        <span className="pin pin-safe" />
        <Building2 size={60} />
      </div>
      <p>Top hazard location: Science Complex</p>
    </section>
  );
}

export function Protocols() {
  const protocols = [
    { icon: Flame, title: 'Fire Response' },
    { icon: Wrench, title: 'Facility Lockout' },
    { icon: Activity, title: 'Medical Triage' }
  ];

  return (
    <section className="glass-panel protocols">
      <h2>
        Urgent Protocols
        <GuideTip title="Protocol guide">
          Use these response shortcuts for common emergency workflows that need fast coordination.
        </GuideTip>
      </h2>
      {protocols.map(({ icon: Icon, title }) => (
        <button key={title}>
          <Icon size={20} />
          <span>{title}</span>
          <ChevronRight size={18} />
        </button>
      ))}
    </section>
  );
}

export default function CommandCenter({ metrics, incidentsList }) {
  return (
    <div className="screen desktop-grid">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Real-time safety intelligence</p>
          <h1>
            Admin Command Center
            <GuideTip title="Dashboard guide">
              This workspace is for reviewing live reports, narrowing them by category or severity, and deciding which incidents need response first.
            </GuideTip>
          </h1>
          <p>Monitor active hazards, assign response units, and keep COOU facilities compliant.</p>
        </div>
        <button className="secondary-button"><Download size={18} /> Shift Report</button>
      </section>

      <aside className="filter-panel glass-panel">
        <h2>
          <Filter size={18} /> Filters
          <GuideTip title="Using filters">
            Filters help admins focus on a specific hazard type, priority level, or campus area before assigning response work.
          </GuideTip>
        </h2>
        <FieldLabel
          label="Hazard Category"
          guide="Use categories to group similar risks such as laboratory, infrastructure, waste, or electrical issues."
        />
        <CheckRow label="Laboratory" checked />
        <CheckRow label="Infrastructure" checked />
        <CheckRow label="Waste Management" />
        <CheckRow label="Electrical" />
        <FieldLabel
          label="Priority Level"
          guide="Critical means immediate danger, Warning means urgent follow-up, and Stable means the area still needs review but is not escalating."
        />
        <div className="chip-grid">
          <SeverityChip severity="critical" label="Critical" />
          <SeverityChip severity="high" label="Warning" />
          <SeverityChip severity="low" label="Stable" />
        </div>
        <FieldLabel
          label="Facility Location"
          guide="Select a campus zone to focus the feed on reports from that location."
        />
        <select>
          <option>All campus zones</option>
          <option>Science Complex</option>
          <option>Administrative Block</option>
          <option>West Parking</option>
        </select>
      </aside>

      <section className="content-column">
        <div className="metric-grid">
          {metrics.slice(0, 3).map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
        <div className="section-title">
          <h2>
            Active Incident Feed
            <GuideTip title="Incident cards">
              Each card shows severity, location, timing, assigned unit, and progress so admins can quickly decide the next action.
            </GuideTip>
          </h2>
          <div className="view-toggle">
            <button className="active">Grid</button>
            <button>List</button>
          </div>
        </div>
        <div className="incident-grid">
          {incidentsList.slice(0, 8).map((incident) => <IncidentCard key={incident.id} incident={incident} />)}
        </div>
      </section>

      <aside className="right-rail">
        <CampusMap />
        <Protocols />
      </aside>
    </div>
  );
}
