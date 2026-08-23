import React, { useState } from 'react';
import { Siren, Send } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import GuideTip from '../common/GuideTip';
import FieldLabel from '../common/FieldLabel';
import { createHazardReportId } from '../../lib/dataMappers';

const EMERGENCY_PHONE_NUMBER = '0800-000-0000';

export default function EmergencyCenter({ session, incidentsList, alertsList, refreshData, onReportCreated, compact = false }) {
  const [emergencyType, setEmergencyType] = useState('Medical emergency');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  const emergencyCategory = {
    'Medical emergency': 'Medical',
    'Fire safety': 'Fire',
    'Chemical leak / spill': 'Laboratory',
    'Facility collapse / lock': 'Infrastructure',
    'Electrical/power issue': 'Electrical'
  }[emergencyType] || 'Infrastructure';

  const handleEmergencySubmit = async (event) => {
    event.preventDefault();
    if (!location.trim() || !details.trim()) {
      alert('Please add the emergency location and details.');
      return;
    }

    setSubmitting(true);
    const reportId = createHazardReportId();
    const emergencyReport = {
      id: reportId,
      title: `Emergency: ${emergencyType}`,
      category: emergencyCategory,
      location,
      reporter_name: session?.name || 'Campus User',
      severity: 'critical',
      description: details,
      status: 'Reported',
      assigned_to: 'Emergency Response Desk',
      progress: 0
    };

    try {
      if (isSupabaseConfigured) {
        const { error: insertErr } = await supabase
          .from('hazard_reports')
          .insert([emergencyReport]);
        if (insertErr) throw insertErr;

        await supabase
          .from('activity_logs')
          .insert([{ description: `Emergency report ${reportId} submitted by ${session?.name || 'Campus User'} at ${location}.` }]);

        if (refreshData) await refreshData();
        if (onReportCreated) onReportCreated(emergencyReport);
      } else {
        if (onReportCreated) onReportCreated(emergencyReport);
      }

      setSubmittedMessage(`Emergency report ${reportId} has been logged for response.`);
      setLocation('');
      setDetails('');
      setEmergencyType('Medical emergency');
    } catch (err) {
      console.error(err);
      alert('Failed to submit emergency report: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={compact ? 'mobile-screen emergency-screen compact' : 'screen emergency-screen'}>
      <section className={compact ? 'mobile-hero emergency-hero' : 'page-heading full emergency-hero'}>
        <div>
          <p className="eyebrow">Emergency response</p>
          <h1>
            Emergency Dashboard
            <GuideTip title="Emergency dashboard">
              Use this tab for urgent hazards that need immediate attention. Call emergency response first if someone is in direct danger.
            </GuideTip>
          </h1>
        </div>
      </section>

      <section className="emergency-grid">
        <article className="glass-panel emergency-call-panel">
          <Siren size={36} className="critical-pulse" />
          <h2>Immediate Danger?</h2>
          <p>If life, fire, chemical exposure, collapse, or serious injury is involved, contact emergency response before filing a report.</p>
          <div className="emergency-call-actions">
            <a className="primary-button danger-link" href={`tel:${EMERGENCY_PHONE_NUMBER}`}><Siren size={18} /> Call Emergency</a>
            <a className="secondary-button" href="#emergency-report-form"><Send size={18} /> Log Critical Report</a>
          </div>
        </article>

        <form className="glass-panel emergency-form" id="emergency-report-form" onSubmit={handleEmergencySubmit}>
          <h2>Log Emergency Report</h2>
          {submittedMessage && <p className="success-banner" style={{ color: '#4ae176', marginBottom: '15px' }}>{submittedMessage}</p>}
          <label>
            <FieldLabel label="Emergency Type" />
            <select value={emergencyType} onChange={(event) => setEmergencyType(event.target.value)}>
              <option>Medical emergency</option>
              <option>Fire safety</option>
              <option>Chemical leak / spill</option>
              <option>Facility collapse / lock</option>
              <option>Electrical/power issue</option>
            </select>
          </label>
          <label>
            <FieldLabel label="Exact Location *" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Building / Room / Block number"
              required
            />
          </label>
          <label>
            <FieldLabel label="Situation Details *" />
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows="4"
              placeholder="Briefly describe what is happening..."
              required
            />
          </label>
          <button className="primary-button emergency-submit" type="submit" disabled={submitting}>
            <Siren size={18} /> {submitting ? 'Logging Emergency...' : 'Submit Critical Report'}
          </button>
        </form>
      </section>
    </div>
  );
}
