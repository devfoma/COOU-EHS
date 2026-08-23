import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import { FileText, Camera, Send, Sparkles } from 'lucide-react';
import GuideTip from '../common/GuideTip';
import FieldLabel from '../common/FieldLabel';
import SeverityChip from '../common/SeverityChip';
import { createHazardReportId } from '../../lib/dataMappers';

export default function ReportHazard({ session, activityList, refreshData, onReportCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Infrastructure');
  const [location, setLocation] = useState('');
  const [reporter, setReporter] = useState(session?.name || '');
  const [severity, setSeverity] = useState('high');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    setReporter(session?.name || '');
  }, [session?.name]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location || !reporter || !description) {
      alert('Please fill out all required fields.');
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
        reporter_name: reporter,
        reporter_id: session?.userId,
        severity,
        description,
        status: 'Reported',
        progress: 10,
        evidence_url: evidenceUrl
      };

      if (isSupabaseConfigured) {
        // Insert report
        const { error: insertErr } = await supabase
          .from('hazard_reports')
          .insert([newReport]);

        if (insertErr) throw insertErr;

        // Insert log
        await supabase
          .from('activity_logs')
          .insert([{ description: `New hazard report ${reportId} submitted by ${reporter}.` }]);

        if (onReportCreated) onReportCreated(newReport);
        if (refreshData) await refreshData();
        alert(`Report ${reportId} submitted successfully.`);
      } else {
        if (onReportCreated) onReportCreated(newReport);
        alert(`Supabase is not configured. (Mock) Submitted Report ${reportId}!`);
      }

      // Reset form
      setTitle('');
      setLocation('');
      setReporter(session?.name || '');
      setDescription('');
      setFile(null);
      setFilePreview(null);
    } catch (err) {
      console.error(err);
      alert('Error submitting report: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="screen report-layout">
      <section className="page-heading full">
        <div>
          <p className="eyebrow">Digital hazard reporting</p>
          <h1>
            Report a Campus Hazard
            <GuideTip title="Reporting guide">
              Fill the required fields with enough detail for EHS to find the hazard, judge the risk, and assign a response team.
            </GuideTip>
          </h1>
          <p>Capture the details admins need to prioritize, assign, and resolve safety incidents.</p>
        </div>
      </section>

      <form className="glass-panel hazard-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <FieldLabel
              label="Hazard Title *"
              guide="Use a short, clear title that names the problem, for example: Broken stair rail at Faculty Block."
            />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chemical spill in Lab 4B"
              required
            />
          </label>
          <label>
            <FieldLabel
              label="Category *"
              guide="Choose the closest hazard type. If it does not fit perfectly, pick the nearest option and explain it in the description."
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Laboratory">Laboratory</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Electrical">Electrical Hazard</option>
              <option value="Biological">Biological Risk</option>
            </select>
          </label>
          <label>
            <FieldLabel
              label="Exact Location *"
              guide="Include building, floor, room, office, landmark, or nearby facility so responders can find it quickly."
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Room / floor / building"
              required
            />
          </label>
          <label>
            <FieldLabel
              label="Reporter Name *"
              guide="Use your name or department so the response team can follow up if more details are needed."
            />
            <input
              value={reporter}
              onChange={(e) => setReporter(e.target.value)}
              placeholder="Your name or department"
              required
            />
          </label>
        </div>

        <FieldLabel
          label="Evidence Documentation"
          guide="Add a photo or document only when it is safe. Never move closer to a hazard just to capture evidence."
        />
        <div
          className="upload-zone"
          onClick={() => document.getElementById('file-input').click()}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <input
            type="file"
            id="file-input"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {filePreview ? (
            <div className="preview-container" onClick={(e) => e.stopPropagation()}>
              <img src={filePreview} alt="Evidence preview" className="evidence-preview" />
              <div className="preview-overlay">
                <span>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                <button type="button" className="remove-file-btn" onClick={removeFile}>Remove</button>
              </div>
            </div>
          ) : file ? (
            <div className="preview-container" onClick={(e) => e.stopPropagation()}>
              <FileText size={32} />
              <div className="preview-overlay">
                <span>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                <button type="button" className="remove-file-btn" onClick={removeFile}>Remove</button>
              </div>
            </div>
          ) : (
            <>
              <Camera size={28} />
              <strong>Upload photo or document evidence</strong>
              <span>PNG, JPG, or PDF up to 10MB</span>
            </>
          )}
        </div>

        <FieldLabel
          label="Severity Level"
          guide="Low is minor, Medium needs attention, High could cause injury or disruption, and Critical means immediate danger."
        />
        <div className="severity-selector">
          {['low', 'medium', 'high', 'critical'].map((s) => (
            <button
              key={s}
              type="button"
              className={severity === s ? 'selected' : ''}
              onClick={() => setSeverity(s)}
            >
              <SeverityChip severity={s} label={s.toUpperCase()} />
            </button>
          ))}
        </div>

        <label>
          <FieldLabel
            label="Detailed Description *"
            guide="Describe what happened, who may be affected, immediate dangers, and any action already taken."
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            placeholder="Describe the hazard, immediate dangers, and any actions already taken."
            required
          />
        </label>

        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={submitting}>
            <Send size={18} /> {submitting ? 'Submitting...' : 'Submit Hazard Report'}
          </button>
          <button className="ghost-button" type="button">Save Draft</button>
        </div>
      </form>

      <aside className="glass-panel activity-panel">
        <h2>Recent Activity</h2>
        {(activityList || []).map((item, idx) => (
          <p key={idx}><Sparkles size={15} />{item}</p>
        ))}
      </aside>
    </div>
  );
}
