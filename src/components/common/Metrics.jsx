import React from 'react';
import GuideTip from './GuideTip';

export function MetricCard({ metric }) {
  const Icon = metric.icon;
  return (
    <article className={`metric-card glass-panel ${metric.tone}`}>
      <div>
        <p>{metric.label}</p>
        <strong>{metric.value}</strong>
        <span>{metric.trend}</span>
      </div>
      <Icon size={26} />
    </article>
  );
}

export function MetricMini({ value, label, guide }) {
  return (
    <article className="glass-panel metric-mini">
      <strong>{value}</strong>
      <span>
        {label}
        {guide && <GuideTip title={label}>{guide}</GuideTip>}
      </span>
    </article>
  );
}
