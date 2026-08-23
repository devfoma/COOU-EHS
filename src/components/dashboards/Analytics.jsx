import React from 'react';
import { Download } from 'lucide-react';
import { MetricCard } from '../common/Metrics';
import GuideTip from '../common/GuideTip';
import SeverityChip from '../common/SeverityChip';

export default function Analytics({ metrics }) {
  return (
    <div className="screen analytics-screen">
      <section className="page-heading full">
        <div>
          <p className="eyebrow">Compliance and performance audit</p>
          <h1>
            Executive Analytics
            <GuideTip title="Analytics guide">
              This dashboard summarizes safety performance, recurring hazard patterns, and compliance observations for decision makers.
            </GuideTip>
          </h1>
          <p>Track institutional safety performance and recurring environmental health risks.</p>
        </div>
        <button className="secondary-button"><Download size={18} /> Export Audit</button>
      </section>

      <div className="metric-grid four">
        {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </div>

      <section className="glass-panel chart-panel">
        <div className="section-title">
          <h2>
            Incident Trends
            <GuideTip title="Trend view">
              Compare periods to spot recurring risks, slower response areas, or locations that need preventive action.
            </GuideTip>
          </h2>
          <div className="view-toggle"><button className="active">Monthly</button><button>Quarterly</button></div>
        </div>
        <div className="bar-chart">
          {[42, 58, 36, 72, 64, 48, 78, 54].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </section>

      <section className="glass-panel audit-table">
        <h2>
          Audit Observations
          <GuideTip title="Audit notes">
            These items highlight compliance issues and improvements that admins should review during safety planning.
          </GuideTip>
        </h2>
        {['Laboratory storage labeling needs review', 'Emergency exit obstruction resolved', 'Waste pickup frequency improved'].map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <p>{item}</p>
            <SeverityChip severity={index === 0 ? 'high' : 'low'} label={index === 0 ? 'Review' : 'Stable'} />
          </div>
        ))}
      </section>
    </div>
  );
}
