import React from 'react';
import { UserCircle, ShieldCheck, X } from 'lucide-react';
import { roles } from '../../lib/access';

export default function ProfileModal({ session, onClose, onLogout, onEditProfile }) {
  const roleConfig = roles[session.role] || roles.student;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header">
          <div>
            <p className="eyebrow">Account profile</p>
            <h2 id="profile-modal-title">{session.name || roleConfig.label}</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close profile modal" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        <div className="profile-summary">
          <div className="profile-avatar"><UserCircle size={38} /></div>
          <div>
            <strong>{roleConfig.label}</strong>
            <span>{session.email}</span>
            {session.department && <span>{session.department}</span>}
          </div>
        </div>

        <div className="profile-access-list">
          <h3>Workspace access</h3>
          {roleConfig.permissions.map((permission) => (
            <span key={permission}><ShieldCheck size={14} />{permission.replace(':', ' ')}</span>
          ))}
        </div>

        <div className="modal-actions">
          {onEditProfile && (
            <button className="primary-button" type="button" onClick={() => { onEditProfile(); onClose(); }}>
              Edit Profile
            </button>
          )}
          <button className="ghost-button" type="button" onClick={onClose}>Close</button>
          <button className="secondary-button" type="button" onClick={onLogout}>Sign Out</button>
        </div>
      </section>
    </div>
  );
}
