import React from 'react';
import { MapPin, Siren } from 'lucide-react';
import GuideTip from '../common/GuideTip';
import SeverityChip from '../common/SeverityChip';

export default function MobileAlerts({ role, alertsList, setView }) {
  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">Live campus notices</p>
        <h1>
          Campus Alerts
          <GuideTip title="Alert guide">
            Alerts communicate campus safety notices, affected locations, and timing for issues that users should know about.
          </GuideTip>
        </h1>
      </section>
      {(alertsList || []).map((alert) => (
        <article key={alert.id || alert.title} className={`mobile-alert glass-panel ${alert.severity}`}>
          <SeverityChip severity={alert.severity} />
          <h2>{alert.title}</h2>
          <p>{alert.body}</p>
          <span><MapPin size={15} />{alert.location}</span>
          <small>{alert.time_label || alert.time}</small>
        </article>
      ))}
      <section className="assist-card" onClick={() => setView && setView('emergency')} style={{ cursor: 'pointer' }}>
        <Siren size={28} />
        <div>
          <h2>
            Immediate Assistance?
            <GuideTip title="Emergency help">
              Use emergency response for immediate danger. Submit a COOU-EHS report afterward when it is safe.
            </GuideTip>
          </h2>
          <p>Call campus emergency response.</p>
        </div>
      </section>
    </div>
  );
}
