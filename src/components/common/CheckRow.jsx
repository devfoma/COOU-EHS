import React from 'react';

export default function CheckRow({ label, checked }) {
  return (
    <label className="check-row">
      <input type="checkbox" defaultChecked={checked} />
      <span>{label}</span>
    </label>
  );
}
