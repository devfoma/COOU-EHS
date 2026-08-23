import React, { useState } from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import GuideTip from '../common/GuideTip';
import FieldLabel from '../common/FieldLabel';
import SeverityChip from '../common/SeverityChip';

export default function IncidentTimeline({ incident, refreshData }) {
  const [summary, setSummary] = useState('');
  const [airQuality, setAirQuality] = useState('');
  const [surfacePh, setSurfacePh] = useState('');
  const [signoff, setSignoff] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const steps = [
    { title: 'Hazard Submitted', text: 'Initial report submitted with location and photo evidence.', done: true },
    { title: 'Assigned to EHS Unit', text: `Safety response unit assigned for on-site review. Status: ${incident.status}`, done: true },
    { title: 'In Progress: On-Site Assessment', text: 'Containment team verifying spill boundary and ventilation.', done: incident.status !== 'Reported' },
    { title: 'Resolved', text: 'Safety checks complete and confirmed.', done: incident.status === 'Resolved' }
  ];

  const handleResolve = async () => {
    if (!signoff) {
      alert('Please confirm safety checks are complete by checking the signoff box.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSupabaseConfigured) {
        // Update report status
        const { error: updateErr } = await supabase
          .from('hazard_reports')
          .update({ status: 'Resolved', progress: 100 })
          .eq('id', incident.id);

        if (updateErr) throw updateErr;

        // Insert log
        await supabase
          .from('activity_logs')
          .insert([{ description: `Incident ${incident.id} resolved. Air: ${airQuality || 'N/A'}, pH: ${surfacePh || 'N/A'}.` }]);

        if (refreshData) await refreshData();
        alert(`Incident ${incident.id} status updated to Resolved!`);
      } else {
        alert(`Supabase is not configured. (Mock) Resolved incident ${incident.id}!`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to resolve incident: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="screen timeline-layout">
      <section className="page-heading full">
        <div>
          <p className="eyebrow">Incident details</p>
          <h1>
            Incident <span>{incident.id}</span>
            <GuideTip title="Incident tracking">
              This view records response progress and the final safety checks needed before a hazard can be marked resolved.
            </GuideTip>
          </h1>
          <p>{incident.title} at {incident.location}</p>
        </div>
        <SeverityChip severity={incident.severity} />
      </section>

      <section className="glass-panel timeline-panel">
        <h2>
          Resolution Timeline
          <GuideTip title="Progress stages">
            Reported means the issue was submitted, Assigned means a responder owns it, In Progress means checks are underway, and Resolved means safety work is complete.
          </GuideTip>
        </h2>
        <div className="timeline">
          {steps.map((step) => (
            <article key={step.title} className={step.done ? 'done' : ''}>
              <span />
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="glass-panel resolution-form">
        <h2>
          Resolution Form
          <GuideTip title="Closure details">
            Admins use this form to document the final action, add safety readings, attach proof, and confirm the location is ready for verification.
          </GuideTip>
        </h2>
        <label>
          <FieldLabel
            label="Final Disposition Summary"
            guide="Summarize what was repaired, cleaned, isolated, replaced, or inspected before closure."
          />
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows="4"
            placeholder="Describe final actions taken..."
          />
        </label>
        <div className="form-grid single">
          <label>
            <FieldLabel
              label="Air Quality (PPM)"
              guide="Enter a reading when air quality checks apply. Leave blank if this incident does not require it."
            />
            <input
              value={airQuality}
              onChange={(e) => setAirQuality(e.target.value)}
              placeholder="0.04"
            />
          </label>
          <label>
            <FieldLabel
              label="Surface PH"
              guide="Use this for spill or chemical cleanup verification. Neutral readings are usually around pH 7."
            />
            <input
              value={surfacePh}
              onChange={(e) => setSurfacePh(e.target.value)}
              placeholder="7.0 neutral"
            />
          </label>
        </div>
        <div className="upload-zone compact">
          <Camera size={22} />
          <strong>
            Upload post-cleanup proof
            <GuideTip title="Proof guide">
              Add final photos or documents showing the area was cleaned, repaired, or made safe.
            </GuideTip>
          </strong>
        </div>
        <label className="signoff">
          <input
            type="checkbox"
            checked={signoff}
            onChange={(e) => setSignoff(e.target.checked)}
          />
          I confirm safety checks are complete and the location is ready for verification.
        </label>
        <button
          className="primary-button"
          type="button"
          onClick={handleResolve}
          disabled={submitting}
        >
          <CheckCircle2 size={18} /> {submitting ? 'Resolving...' : 'Submit Resolution'}
        </button>
      </aside>
    </div>
  );
}
