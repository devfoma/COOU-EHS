import React from 'react';
import GuideTip from './GuideTip';

export default function FieldLabel({ label, guide, guideTitle }) {
  return (
    <span className="field-label">
      {label}
      {guide && <GuideTip title={guideTitle || label}>{guide}</GuideTip>}
    </span>
  );
}
