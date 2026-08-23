export function formatRelativeTime(value) {
  if (!value) return 'Recently';

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return 'Recently';

  const diffInMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return diffInDays === 1 ? 'Yesterday' : `${diffInDays}d ago`;
}

export function mapReportRow(row) {
  return {
    ...row,
    assignedTo: row.assignedTo || row.assigned_to || 'Unassigned',
    reporter: row.reporter || row.reporter_name || 'Campus user',
    time: row.time || row.time_label || formatRelativeTime(row.created_at),
    progress: Number(row.progress ?? 0)
  };
}

export function mapAlertRow(row) {
  return {
    ...row,
    time: row.time || row.time_label || formatRelativeTime(row.created_at)
  };
}

export function createHazardReportId() {
  const timestampPart = Date.now().toString().slice(-5);
  const randomPart = Math.floor(100 + Math.random() * 900);
  return `HAZ-${timestampPart}${randomPart}`;
}
