'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Building, Camera, Check, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';

export default function SettingsPanel({ session, refreshData }) {
  const [name, setName] = useState(session?.name || '');
  const [department, setDepartment] = useState(session?.department || '');
  const [avatarUrl, setAvatarUrl] = useState(session?.avatarUrl || session?.avatar_url || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load latest profile from DB to ensure fresh state
  useEffect(() => {
    async function loadLatestProfile() {
      if (!isSupabaseConfigured || !session?.userId) return;
      try {
        const { data, error: fetchErr } = await supabase
          .from('profiles')
          .select('name, department, avatar_url')
          .eq('id', session.userId)
          .maybeSingle();

        if (fetchErr) throw fetchErr;
        if (data) {
          setName(data.name || '');
          setDepartment(data.department || '');
          setAvatarUrl(data.avatar_url || '');
        }
      } catch (err) {
        console.error('Failed to load profile for settings:', err);
      }
    }
    loadLatestProfile();
  }, [session]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isSupabaseConfigured) {
      setError('Database connection is not configured.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Avatar image size must be under 5MB.');
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${session.userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Upload file to the public 'evidence' bucket
      const { error: uploadErr } = await supabase.storage
        .from('evidence')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadErr) throw uploadErr;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('evidence')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      setMessage('Profile photo uploaded. Click Save Changes to apply.');
    } catch (err) {
      console.error('Avatar upload failed:', err);
      setError(err.message || 'Failed to upload photo.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      setError('Database connection is not configured.');
      return;
    }

    setSaving(true);
    setError('');
    setMessage('');

    try {
      // 1. Update profiles table
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({
          name,
          department,
          avatar_url: avatarUrl
        })
        .eq('id', session.userId);

      if (profileErr) {
        // If avatar_url column doesn't exist, try updating without it
        if (profileErr.message?.includes('avatar_url')) {
          const { error: fallbackProfileErr } = await supabase
            .from('profiles')
            .update({ name, department })
            .eq('id', session.userId);
          if (fallbackProfileErr) throw fallbackProfileErr;
        } else {
          throw profileErr;
        }
      }

      // 2. Update auth user metadata so it persists inside session
      const { error: authErr } = await supabase.auth.updateUser({
        data: {
          name,
          department,
          avatar_url: avatarUrl
        }
      });

      if (authErr) throw authErr;

      setMessage('Settings updated successfully!');
      if (refreshData) {
        // Refresh root layouts
        await refreshData();
      }
    } catch (err) {
      console.error('Update settings failed:', err);
      setError(err.message || 'Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-panel glass-panel">
      <div className="settings-header">
        <h2>Account Settings</h2>
        <p>Manage your campus profile details and verification details.</p>
      </div>

      {message && (
        <div className="settings-alert success">
          <Check size={18} />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="settings-alert error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="settings-form">
        <div className="avatar-uploader">
          <div className="avatar-preview-wrapper">
            {avatarUrl ? (
              <img src={avatarUrl} alt="User Avatar" className="avatar-preview-img" />
            ) : (
              <div className="avatar-placeholder">
                <User size={48} />
              </div>
            )}
            <label className="avatar-upload-label">
              <Camera size={16} />
              <input type="file" accept="image/*" onChange={handleAvatarChange} disabled={uploading} style={{ display: 'none' }} />
            </label>
          </div>
          <div className="avatar-info">
            <h3>Profile Photo</h3>
            <p>Upload a clean JPEG or PNG image under 5MB.</p>
            {uploading && (
              <span className="upload-loader">
                <Loader2 className="spinner" size={14} /> Uploading picture...
              </span>
            )}
          </div>
        </div>

        <div className="settings-fields">
          <div className="settings-field">
            <label>
              <span className="field-title"><User size={16} /> Full Name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" required disabled={saving} />
            </label>
          </div>

          <div className="settings-field">
            <label>
              <span className="field-title"><Mail size={16} /> Email Address</span>
              <input type="email" value={session?.email || ''} readOnly disabled className="readonly-input" />
            </label>
            <span className="field-hint">Email address cannot be changed from settings.</span>
          </div>

          <div className="settings-field">
            <label>
              <span className="field-title"><Building size={16} /> Department or Unit</span>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Computer Science" disabled={saving} />
            </label>
          </div>

          <div className="settings-field">
            <label>
              <span className="field-title"><Shield size={16} /> Account Security Role</span>
              <input type="text" value={session?.role ? session.role.toUpperCase() : 'STUDENT'} readOnly disabled className="readonly-input" />
            </label>
            <span className="field-hint">Role escalations must be coordinated via safety administration.</span>
          </div>
        </div>

        <button type="submit" className="primary-button save-settings-btn" disabled={saving || uploading}>
          {saving ? (
            <>
              <Loader2 className="spinner" size={16} /> Saving changes...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
}
