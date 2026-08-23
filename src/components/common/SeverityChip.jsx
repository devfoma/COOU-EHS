import React from 'react';

export default function SeverityChip({ severity, label }) {
  return <span className={`severity-chip ${severity}`}>{label || severity}</span>;
}
