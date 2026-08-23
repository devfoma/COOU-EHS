import React from 'react';
import { Bell } from 'lucide-react';
import GuideTip from '../common/GuideTip';

export default function MobileTracker({ incident }) {
  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">Incident #{incident.id}</p>
        <h1>
          {incident.title}
          <GuideTip title="Tracker guide">
            Follow where your report is in the response process and enable update notifications when needed.
          </GuideTip>
        </h1>
      </section>
      <article className="glass-panel tracker-card">
        <div>
          <span>Risk</span>
          <strong>{incident.severity.toUpperCase()} Risk</strong>
        </div>
        <div>
          <span>Category</span>
          <strong>{incident.category}</strong>
        </div>
      </article>
      <section className="glass-panel mini-timeline">
        <h2>
          Resolution Progress
          <GuideTip title="Progress stages">
            Each stage shows whether your report is still submitted, assigned, in progress, or resolved.
          </GuideTip>
        </h2>
        {['Reported', 'Assigned', 'In Progress', 'Resolved'].map((step, index) => {
          const isDone =
            (step === 'Reported') ||
            (step === 'Assigned' && incident.status !== 'Reported') ||
            (step === 'In Progress' && incident.status !== 'Reported' && incident.status !== 'Assigned') ||
            (step === 'Resolved' && incident.status === 'Resolved');
          return (
            <div key={step} className={isDone ? 'done' : ''}>
              <span />
              <p>{step}</p>
            </div>
          );
        })}
      </section>
      <button className="primary-button mobile-submit" type="button"><Bell size={18} /> Notify Me on Updates</button>
      <button className="ghost-button mobile-submit" type="button">Share Report</button>
    </div>
  );
}
