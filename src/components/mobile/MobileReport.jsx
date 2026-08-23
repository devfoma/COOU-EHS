import React, { useState } from 'react';
import { Camera, FileText, Zap, Wrench, Flame, Activity, Send } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import GuideTip from '../common/GuideTip';
import FieldLabel from '../common/FieldLabel';
import SeverityChip from '../common/SeverityChip';
import { createHazardReportId } from '../../lib/dataMappers';

export function MobileReportCard({ incident }) {
  return (
    <article className="glass-panel mobile-report-card">
      <div>
        <SeverityChip severity={incident.severity} />
        <span>{incident.status}</span>
      </div>
      <h3>{incident.title}</h3>
      <p>{incident.location}</p>
    </article>
  );
}

export function CategoryButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={`category-button ${active ? 'active' : ''}`} type="button" onClick={onClick}>
      <Icon size={22} />
      <span>{label}</span>
    </button>
  );
}

export default function MobileReport({ session, refreshData, onReportCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electrical');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('high');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10MB limit.');
      return;
    }
    setFile(selectedFile);
    if (selectedFile.type.startsWith('image/')) {
      setFilePreview(URL.createObjectURL(selectedFile));
    } else {
      setFilePreview(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!title || !location || !description) {
      alert('Please fill out all fields.');
      return;
    }

    setSubmitting(true);
    let evidenceUrl = '';

    try {
      if (file && isSupabaseConfigured) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${session?.userId || 'anonymous'}/${fileName}`;

        const { error: uploadErr } = await supabase.storage
          .from('evidence')
          .upload(filePath, file);

        if (uploadErr) throw uploadErr;

        const { data: { publicUrl } } = supabase.storage
          .from('evidence')
          .getPublicUrl(filePath);

        evidenceUrl = publicUrl;
      }

      const reportId = createHazardReportId();
      const newReport = {
        id: reportId,
        title,
        category,
        location,
        reporter_name: session?.name || 'Mobile App User',
        reporter_id: session?.userId,
        severity,
        description,
        status: 'Reported',
        progress: 10,
        evidence_url: evidenceUrl
      };

      if (isSupabaseConfigured) {
        const { error: insertErr } = await supabase
          .from('hazard_reports')
          .insert([newReport]);

        if (insertErr) throw insertErr;

        await supabase
          .from('activity_logs')
          .insert([{ description: `Mobile report ${reportId} submitted at ${location}.` }]);

        if (onReportCreated) onReportCreated(newReport);
        if (refreshData) await refreshData();
        alert(`Mobile report ${reportId} submitted successfully!`);
      } else {
        if (onReportCreated) onReportCreated(newReport);
        alert(`Supabase not configured. (Mock) Submitted ${reportId}!`);
      }

      setTitle('');
      setLocation('');
      setDescription('');
      setFile(null);
      setFilePreview(null);
    } catch (err) {
      console.error(err);
      alert('Failed to submit mobile report: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">Fast field report</p>
        <h1>
          Report Hazard
          <GuideTip title="Mobile reporting guide">
            Submit a quick report from your phone with title, category, location, risk level, and details.
          </GuideTip>
        </h1>
      </section>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        <FieldLabel
          label="Report Title *"
          guide="Keep it short and specific so the report is easy to identify later."
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief title (e.g. Broken steps)"
          required
        />
      </label>

      <FieldLabel
        label="Category"
        guide="Pick the option that best matches the hazard so the right response team can review it."
      />
      <div className="category-grid">
        {[
          { key: 'Electrical', icon: Zap },
          { key: 'Facility', icon: Wrench },
          { key: 'Fire', icon: Flame },
          { key: 'Laboratory', icon: Activity }
        ].map((item) => (
          <CategoryButton
            key={item.key}
            icon={item.icon}
            label={item.key}
            active={category === item.key}
            onClick={() => setCategory(item.key)}
          />
        ))}
      </div>
      <label>
        <FieldLabel
          label="Location *"
          guide="Add the building, room, floor, or nearby landmark."
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Building / Room number"
          required
        />
      </label>
      <div
        className="upload-zone compact"
        onClick={() => document.getElementById('mobile-file-input').click()}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <input
          type="file"
          id="mobile-file-input"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {filePreview ? (
          <div className="preview-container" onClick={(e) => e.stopPropagation()}>
            <img src={filePreview} alt="Evidence preview" className="evidence-preview" />
            <div className="preview-overlay">
              <span>{file.name}</span>
              <button type="button" className="remove-file-btn" onClick={removeFile}>Remove</button>
            </div>
          </div>
        ) : file ? (
          <div className="preview-container" onClick={(e) => e.stopPropagation()}>
            <FileText size={24} />
            <div className="preview-overlay">
              <span>{file.name}</span>
              <button type="button" className="remove-file-btn" onClick={removeFile}>Remove</button>
            </div>
          </div>
        ) : (
          <>
            <Camera size={24} />
            <strong>
              Add visual evidence
              <GuideTip title="Evidence guide">
                Add a clear photo when safe. Skip this if taking a photo would put you near danger.
              </GuideTip>
            </strong>
          </>
        )}
      </div>
      <FieldLabel
        label="Risk Level"
        guide="Low is minor, Medium needs attention, High could cause injury or disruption, and Critical means immediate danger."
      />
      <div className="mobile-risk">
        {['low', 'medium', 'high', 'critical'].map((r) => (
          <button
            key={r}
            className={severity === r ? 'active' : ''}
            onClick={() => setSeverity(r)}
            type="button"
          >
            {r.substring(0, 4).toUpperCase()}
          </button>
        ))}
      </div>
      <label>
        <FieldLabel
          label="Incident Details *"
          guide="Explain what is unsafe, who may be affected, and whether anyone has already taken action."
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Describe the hazard and immediate dangers..."
          required
        />
      </label>
      <button
        className="primary-button mobile-submit"
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
      >
        <Send size={18} /> {submitting ? 'Submitting...' : 'Submit Hazard Report'}
      </button>
    </div>
  );
}
