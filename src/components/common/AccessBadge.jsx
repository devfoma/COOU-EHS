import React from 'react';
import { ShieldCheck } from 'lucide-react';

const roleLabels = {
  student: 'Student',
  staff: 'Staff',
  admin: 'Admin'
};

export default function AccessBadge({ role }) {
  return (
    <span className="access-badge">
      <ShieldCheck size={15} />
      {roleLabels[role] || role}
    </span>
  );
}
