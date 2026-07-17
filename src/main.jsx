import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CalendarCheck,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  FileText,
  Filter,
  Flame,
  Home,
  LayoutDashboard,
  MapPin,
  Menu,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Siren,
  Sparkles,
  UserCircle,
  Users,
  Wrench,
  Zap
} from 'lucide-react';
import './styles.css';

const BRAND_NAME = 'COUU-EHS';
const LOGO_URL = new URL('../ASSETS/COOU-EHS LOGO.png', import.meta.url).href;

const incidents = [
  {
    id: 'HAZ-2904',
    title: 'Chemical Leak - Block C-14',
    category: 'Laboratory',
    location: 'Science Complex, Lab 4B',
    severity: 'critical',
    status: 'In Progress',
    reporter: 'Dr. Ifeoma N.',
    assignedTo: 'Officer Marcus R.',
    time: '12 min ago',
    description: 'Chemical odor detected near reagent storage. Students evacuated from adjacent rooms.',
    progress: 68
  },
  {
    id: 'HAZ-1841',
    title: 'Elevator Malfunction',
    category: 'Infrastructure',
    location: 'Administrative Block',
    severity: 'high',
    status: 'Assigned',
    reporter: 'Chiamaka O.',
    assignedTo: 'Facility Response Unit',
    time: '41 min ago',
    description: 'Elevator doors are closing irregularly. Access restricted pending inspection.',
    progress: 38
  },
  {
    id: 'HAZ-1377',
    title: 'Waste Disposal Clearance',
    category: 'Waste',
    location: 'Zone D Collection Bay',
    severity: 'low',
    status: 'Awaiting Verification',
    reporter: 'Emeka A.',
    assignedTo: 'Sanitation Unit',
    time: '4h ago',
    description: 'Hazardous waste pickup scheduled. Decontamination documents required before exit.',
    progress: 84
  },
  {
    id: 'HAZ-9842',
    title: 'Faulty Lighting - West Parking',
    category: 'Electrical',
    location: 'West Parking Area',
    severity: 'medium',
    status: 'Investigating',
    reporter: 'Student Affairs',
    assignedTo: 'Maintenance Unit',
    time: 'Yesterday',
    description: 'Three light poles are inactive around the evening parking route.',
    progress: 52
  }
];

const alerts = [
  {
    title: 'Chemical Spill',
    location: 'Science Complex',
    severity: 'critical',
    time: 'Active now',
    body: 'Avoid Block C corridor until EHS officers complete containment.'
  },
  {
    title: 'Power Outage',
    location: 'Engineering Annex',
    severity: 'high',
    time: 'Ends 4:30 PM',
    body: 'Use marked stair routes. Maintenance team is restoring supply.'
  },
  {
    title: 'Clinic Sanitation Drill',
    location: 'Medical Centre',
    severity: 'low',
    time: 'Oct 24',
    body: 'Routine safety inspection and hand hygiene audit in progress.'
  }
];

const activity = [
  'Officer Marcus R. updated HAZ-2904 to In Progress.',
  'New evidence uploaded for HAZ-1841.',
  'Sanitation Unit requested verification for HAZ-1377.',
  'Campus alert published for Science Complex.'
];

function App() {
  const [desktopView, setDesktopView] = useState('command');
  const [mobileView, setMobileView] = useState('dashboard');
  const activeIncident = incidents[0];

  const metrics = useMemo(() => [
    { label: 'Active Hazards', value: '12', trend: '+3 today', tone: 'critical', icon: Siren },
    { label: 'Resolved Today', value: '84', trend: '+18%', tone: 'safe', icon: CheckCircle2 },
    { label: 'Avg. Response', value: '04:12', trend: '22 min faster', tone: 'neutral', icon: Clock3 },
    { label: 'Compliance', value: '94.8%', trend: 'Annual score', tone: 'safe', icon: ClipboardCheck }
  ], []);

  return (
    <main className="app-shell">
      <DesktopApp
        view={desktopView}
        setView={setDesktopView}
        metrics={metrics}
        activeIncident={activeIncident}
      />
      <MobileApp
        view={mobileView}
        setView={setMobileView}
        activeIncident={activeIncident}
      />
    </main>
  );
}

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <img src={LOGO_URL} alt={`${BRAND_NAME} logo`} />
      {!compact && (
        <div>
          <strong>{BRAND_NAME}</strong>
          <span>Safe campus, stronger future</span>
        </div>
      )}
    </div>
  );
}

function DesktopApp({ view, setView, metrics, activeIncident }) {
  return (
    <section className="desktop-app">
      <aside className="sidebar">
        <Brand compact />
        <nav>
          <NavButton icon={LayoutDashboard} label="Dashboard" active={view === 'command'} onClick={() => setView('command')} />
          <NavButton icon={AlertTriangle} label="Hazard Reports" active={view === 'report'} onClick={() => setView('report')} />
          <NavButton icon={FileText} label="Incident Timeline" active={view === 'timeline'} onClick={() => setView('timeline')} />
          <NavButton icon={BarChart3} label="Analytics" active={view === 'analytics'} onClick={() => setView('analytics')} />
          <NavButton icon={Settings} label="Settings" />
        </nav>
        <button className="emergency-button"><Siren size={18} /> Emergency</button>
      </aside>

      <div className="desktop-main">
        <header className="topbar">
          <Brand />
          <div className="desktop-tabs">
            <button className={view === 'command' ? 'active' : ''} onClick={() => setView('command')}>Dashboard</button>
            <button className={view === 'report' ? 'active' : ''} onClick={() => setView('report')}>Hazard Reports</button>
            <button className={view === 'analytics' ? 'active' : ''} onClick={() => setView('analytics')}>Analytics</button>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={16} />
              <input placeholder="Search incident, protocol, officer..." />
            </label>
            <button className="icon-button" aria-label="Notifications"><Bell size={20} /></button>
            <button className="icon-button" aria-label="Profile"><UserCircle size={20} /></button>
          </div>
        </header>

        {view === 'command' && <CommandCenter metrics={metrics} />}
        {view === 'report' && <ReportHazard />}
        {view === 'timeline' && <IncidentTimeline incident={activeIncident} />}
        {view === 'analytics' && <Analytics metrics={metrics} />}
      </div>
    </section>
  );
}

function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick} type="button">
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}

function CommandCenter({ metrics }) {
  return (
    <div className="screen desktop-grid">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Real-time safety intelligence</p>
          <h1>Officer Command Center</h1>
          <p>Monitor active hazards, assign response units, and keep COOU facilities compliant.</p>
        </div>
        <button className="secondary-button"><Download size={18} /> Shift Report</button>
      </section>

      <aside className="filter-panel glass-panel">
        <h2><Filter size={18} /> Filters</h2>
        <FieldLabel label="Hazard Category" />
        <CheckRow label="Laboratory" checked />
        <CheckRow label="Infrastructure" checked />
        <CheckRow label="Waste Management" />
        <CheckRow label="Electrical" />
        <FieldLabel label="Priority Level" />
        <div className="chip-grid">
          <SeverityChip severity="critical" label="Critical" />
          <SeverityChip severity="high" label="Warning" />
          <SeverityChip severity="low" label="Stable" />
        </div>
        <FieldLabel label="Facility Location" />
        <select>
          <option>All campus zones</option>
          <option>Science Complex</option>
          <option>Administrative Block</option>
          <option>West Parking</option>
        </select>
      </aside>

      <section className="content-column">
        <div className="metric-grid">
          {metrics.slice(0, 3).map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
        <div className="section-title">
          <h2>Active Incident Feed</h2>
          <div className="view-toggle">
            <button className="active">Grid</button>
            <button>List</button>
          </div>
        </div>
        <div className="incident-grid">
          {incidents.slice(0, 3).map((incident) => <IncidentCard key={incident.id} incident={incident} />)}
        </div>
      </section>

      <aside className="right-rail">
        <CampusMap />
        <Protocols />
      </aside>
    </div>
  );
}

function MetricCard({ metric }) {
  const Icon = metric.icon;
  return (
    <article className={`metric-card glass-panel ${metric.tone}`}>
      <div>
        <p>{metric.label}</p>
        <strong>{metric.value}</strong>
        <span>{metric.trend}</span>
      </div>
      <Icon size={26} />
    </article>
  );
}

function IncidentCard({ incident }) {
  const buttonText = incident.severity === 'critical' ? 'Take Action' : incident.severity === 'high' ? 'Assign Staff' : 'Clear Status';

  return (
    <article className={`incident-card glass-panel ${incident.severity}`}>
      <div className="incident-card-top">
        <SeverityChip severity={incident.severity} />
        <span>{incident.id}</span>
      </div>
      <h3>{incident.title}</h3>
      <p>{incident.description}</p>
      <div className="incident-meta">
        <span><MapPin size={15} />{incident.location}</span>
        <span><Clock3 size={15} />{incident.time}</span>
      </div>
      <div className="progress-line"><span style={{ width: `${incident.progress}%` }} /></div>
      <div className="incident-actions">
        <span>{incident.assignedTo}</span>
        <button>{buttonText}</button>
      </div>
    </article>
  );
}

function CampusMap() {
  return (
    <section className="glass-panel campus-map">
      <h2>Campus Heat Map</h2>
      <div className="map-box">
        <span className="pin pin-critical" />
        <span className="pin pin-high" />
        <span className="pin pin-safe" />
        <Building2 size={60} />
      </div>
      <p>Top hazard location: Science Complex</p>
    </section>
  );
}

function Protocols() {
  const protocols = [
    { icon: Flame, title: 'Fire Response' },
    { icon: Wrench, title: 'Facility Lockout' },
    { icon: Activity, title: 'Medical Triage' }
  ];

  return (
    <section className="glass-panel protocols">
      <h2>Urgent Protocols</h2>
      {protocols.map(({ icon: Icon, title }) => (
        <button key={title}>
          <Icon size={20} />
          <span>{title}</span>
          <ChevronRight size={18} />
        </button>
      ))}
    </section>
  );
}

function ReportHazard() {
  return (
    <div className="screen report-layout">
      <section className="page-heading full">
        <div>
          <p className="eyebrow">Digital hazard reporting</p>
          <h1>Report a Campus Hazard</h1>
          <p>Capture the details officers need to prioritize, assign, and resolve safety incidents.</p>
        </div>
      </section>

      <form className="glass-panel hazard-form">
        <div className="form-grid">
          <label>
            <FieldLabel label="Hazard Title" />
            <input placeholder="e.g. Chemical spill in Lab 4B" />
          </label>
          <label>
            <FieldLabel label="Category" />
            <select>
              <option>Select hazard type</option>
              <option>Waste Management</option>
              <option>Infrastructure</option>
              <option>Fire Safety</option>
              <option>Electrical Hazard</option>
              <option>Biological Risk</option>
            </select>
          </label>
          <label>
            <FieldLabel label="Exact Location" />
            <input placeholder="Room / floor / building" />
          </label>
          <label>
            <FieldLabel label="Reporter" />
            <input placeholder="Your name or department" />
          </label>
        </div>

        <FieldLabel label="Evidence Documentation" />
        <div className="upload-zone">
          <Camera size={28} />
          <strong>Upload photo or document evidence</strong>
          <span>PNG, JPG, or PDF up to 10MB</span>
        </div>

        <FieldLabel label="Severity Level" />
        <div className="severity-selector">
          <button type="button"><SeverityChip severity="low" label="Low" /></button>
          <button type="button"><SeverityChip severity="medium" label="Medium" /></button>
          <button type="button" className="selected"><SeverityChip severity="high" label="High" /></button>
          <button type="button"><SeverityChip severity="critical" label="Critical" /></button>
        </div>

        <label>
          <FieldLabel label="Detailed Description" />
          <textarea rows="5" placeholder="Describe the hazard, immediate dangers, and any actions already taken." />
        </label>

        <div className="form-actions">
          <button className="primary-button" type="button"><Send size={18} /> Submit Hazard Report</button>
          <button className="ghost-button" type="button">Save Draft</button>
        </div>
      </form>

      <aside className="glass-panel activity-panel">
        <h2>Recent Activity</h2>
        {activity.map((item) => (
          <p key={item}><Sparkles size={15} />{item}</p>
        ))}
      </aside>
    </div>
  );
}

function IncidentTimeline({ incident }) {
  const steps = [
    { title: 'Hazard Submitted', text: 'Initial report submitted with location and photo evidence.', done: true },
    { title: 'Assigned to EHS Unit', text: 'Science safety officer assigned for on-site review.', done: true },
    { title: 'In Progress: On-Site Assessment', text: 'Containment team verifying spill boundary and ventilation.', done: true },
    { title: 'Resolution Pending', text: 'Awaiting final safety measurements and supervisor signoff.', done: false }
  ];

  return (
    <div className="screen timeline-layout">
      <section className="page-heading full">
        <div>
          <p className="eyebrow">Incident details</p>
          <h1>Incident <span>{incident.id}</span></h1>
          <p>{incident.title} at {incident.location}</p>
        </div>
        <SeverityChip severity={incident.severity} />
      </section>

      <section className="glass-panel timeline-panel">
        <h2>Resolution Timeline</h2>
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
        <h2>Resolution Form</h2>
        <label>
          <FieldLabel label="Final Disposition Summary" />
          <textarea rows="4" placeholder="Describe final actions taken..." />
        </label>
        <div className="form-grid single">
          <label>
            <FieldLabel label="Air Quality (PPM)" />
            <input placeholder="0.04" />
          </label>
          <label>
            <FieldLabel label="Surface PH" />
            <input placeholder="7.0 neutral" />
          </label>
        </div>
        <div className="upload-zone compact">
          <Camera size={22} />
          <strong>Upload post-cleanup proof</strong>
        </div>
        <label className="signoff">
          <input type="checkbox" />
          I confirm safety checks are complete and the location is ready for verification.
        </label>
        <button className="primary-button" type="button"><CheckCircle2 size={18} /> Submit Resolution</button>
      </aside>
    </div>
  );
}

function Analytics({ metrics }) {
  return (
    <div className="screen analytics-screen">
      <section className="page-heading full">
        <div>
          <p className="eyebrow">Compliance and performance audit</p>
          <h1>Executive Analytics</h1>
          <p>Track institutional safety performance and recurring environmental health risks.</p>
        </div>
        <button className="secondary-button"><Download size={18} /> Export Audit</button>
      </section>

      <div className="metric-grid four">
        {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </div>

      <section className="glass-panel chart-panel">
        <div className="section-title">
          <h2>Incident Trends</h2>
          <div className="view-toggle"><button className="active">Monthly</button><button>Quarterly</button></div>
        </div>
        <div className="bar-chart">
          {[42, 58, 36, 72, 64, 48, 78, 54].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </section>

      <section className="glass-panel audit-table">
        <h2>Audit Observations</h2>
        {['Laboratory storage labeling needs review', 'Emergency exit obstruction resolved', 'Waste pickup frequency improved'].map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <p>{item}</p>
            <SeverityChip severity={index === 0 ? 'high' : 'low'} label={index === 0 ? 'Review' : 'Stable'} />
          </div>
        ))}
      </section>
    </div>
  );
}

function MobileApp({ view, setView, activeIncident }) {
  return (
    <section className="mobile-app">
      <header className="mobile-header">
        <Brand />
        <button className="icon-button" aria-label="Open menu"><Menu size={20} /></button>
      </header>

      {view === 'dashboard' && <MobileDashboard />}
      {view === 'report' && <MobileReport />}
      {view === 'tracker' && <MobileTracker incident={activeIncident} />}
      {view === 'alerts' && <MobileAlerts />}

      <nav className="mobile-nav">
        <MobileNavButton icon={Home} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
        <MobileNavButton icon={Plus} label="Report" active={view === 'report'} onClick={() => setView('report')} />
        <MobileNavButton icon={FileText} label="Tracker" active={view === 'tracker'} onClick={() => setView('tracker')} />
        <MobileNavButton icon={Bell} label="Alerts" active={view === 'alerts'} onClick={() => setView('alerts')} />
      </nav>
    </section>
  );
}

function MobileNavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={active ? 'active' : ''} onClick={onClick} type="button">
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}

function MobileDashboard() {
  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">My safety impact</p>
        <h1>Campus Dashboard</h1>
      </section>
      <div className="mobile-metrics">
        <MetricMini value="18" label="Total Reports" />
        <MetricMini value="12" label="Resolved Cases" />
      </div>
      <div className="section-title">
        <h2>Active Reports</h2>
        <button>View All</button>
      </div>
      {incidents.slice(1, 4).map((incident) => <MobileReportCard key={incident.id} incident={incident} />)}
      <div className="section-title">
        <h2>Recent Activity</h2>
      </div>
      <div className="mobile-activity glass-panel">
        {activity.slice(0, 3).map((item) => <p key={item}>{item}</p>)}
      </div>
    </div>
  );
}

function MobileReport() {
  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">Fast field report</p>
        <h1>Report Hazard</h1>
      </section>
      <div className="category-grid">
        <CategoryButton icon={Zap} label="Electrical" active />
        <CategoryButton icon={Wrench} label="Facility" />
        <CategoryButton icon={Flame} label="Fire" />
        <CategoryButton icon={Activity} label="Bio Risk" />
      </div>
      <label>
        <FieldLabel label="Location" />
        <input placeholder="Scanning current coordinates..." />
      </label>
      <div className="upload-zone compact">
        <Camera size={24} />
        <strong>Add visual evidence</strong>
      </div>
      <FieldLabel label="Risk Level" />
      <div className="mobile-risk">
        <button>Low</button>
        <button>Med</button>
        <button className="active">High</button>
        <button>Crit</button>
      </div>
      <label>
        <FieldLabel label="Incident Details" />
        <textarea rows="4" placeholder="Describe the hazard and immediate dangers..." />
      </label>
      <button className="primary-button mobile-submit" type="button"><Send size={18} /> Submit Hazard Report</button>
    </div>
  );
}

function MobileTracker({ incident }) {
  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">Incident #{incident.id}</p>
        <h1>{incident.title}</h1>
      </section>
      <article className="glass-panel tracker-card">
        <div>
          <span>Risk</span>
          <strong>High Risk</strong>
        </div>
        <div>
          <span>Category</span>
          <strong>{incident.category}</strong>
        </div>
      </article>
      <section className="glass-panel mini-timeline">
        <h2>Resolution Progress</h2>
        {['Reported', 'Assigned', 'In Progress', 'Resolved'].map((step, index) => (
          <div key={step} className={index < 3 ? 'done' : ''}>
            <span />
            <p>{step}</p>
          </div>
        ))}
      </section>
      <button className="primary-button mobile-submit" type="button"><Bell size={18} /> Notify Me on Updates</button>
      <button className="ghost-button mobile-submit" type="button">Share Report</button>
    </div>
  );
}

function MobileAlerts() {
  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">Live campus notices</p>
        <h1>Campus Alerts</h1>
      </section>
      {alerts.map((alert) => (
        <article key={alert.title} className={`mobile-alert glass-panel ${alert.severity}`}>
          <SeverityChip severity={alert.severity} />
          <h2>{alert.title}</h2>
          <p>{alert.body}</p>
          <span><MapPin size={15} />{alert.location}</span>
          <small>{alert.time}</small>
        </article>
      ))}
      <section className="assist-card">
        <Siren size={28} />
        <div>
          <h2>Immediate Assistance?</h2>
          <p>Call campus emergency response.</p>
        </div>
      </section>
    </div>
  );
}

function MetricMini({ value, label }) {
  return (
    <article className="glass-panel metric-mini">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function MobileReportCard({ incident }) {
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

function CategoryButton({ icon: Icon, label, active }) {
  return (
    <button className={`category-button ${active ? 'active' : ''}`} type="button">
      <Icon size={22} />
      <span>{label}</span>
    </button>
  );
}

function CheckRow({ label, checked }) {
  return (
    <label className="check-row">
      <input type="checkbox" defaultChecked={checked} />
      <span>{label}</span>
    </label>
  );
}

function FieldLabel({ label }) {
  return <span className="field-label">{label}</span>;
}

function SeverityChip({ severity, label }) {
  return <span className={`severity-chip ${severity}`}>{label || severity}</span>;
}

createRoot(document.getElementById('root')).render(<App />);
