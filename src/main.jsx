import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
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
  Info,
  LayoutDashboard,
  LogIn,
  Mail,
  MapPin,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Siren,
  Sparkles,
  UserCircle,
  UserPlus,
  Users,
  Wrench,
  X,
  Zap
} from 'lucide-react';
import './styles.css';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const BRAND_NAME = 'COUU-EHS';
const LOGO_URL = new URL('../ASSETS/COOU-EHS LOGO MARK.png', import.meta.url).href;

const roles = {
  student: {
    label: 'Student',
    description: 'Submit hazards, track your own reports, and receive campus alerts.',
    permissions: ['report:create', 'report:own', 'alerts:view']
  },
  staff: {
    label: 'Staff',
    description: 'Report workplace hazards and monitor personal safety submissions.',
    permissions: ['report:create', 'report:own', 'alerts:view']
  },
  admin: {
    label: 'Admin',
    description: 'Review reports, coordinate response, manage alerts, track analytics, and close incidents.',
    permissions: ['report:create', 'incident:assigned', 'incident:all', 'incident:resolve', 'incident:assign', 'alerts:view', 'alerts:manage', 'analytics:view', 'admin:manage', 'protocols:view']
  }
};

const defaultDesktopViewByRole = {
  student: 'myReports',
  staff: 'myReports',
  admin: 'command'
};

const defaultMobileViewByRole = {
  student: 'dashboard',
  staff: 'dashboard',
  admin: 'dashboard'
};

const roleAliases = {
  officer: 'admin',
  supervisor: 'admin',
  administrator: 'admin',
  management: 'admin'
};

const dashboardRoles = ['student', 'staff', 'admin'];
const selfServiceRoles = ['student', 'staff'];

function hasAccess(role, permission) {
  return roles[role]?.permissions.includes(permission) || false;
}

function canUseOperationalSearch(role) {
  return hasAccess(role, 'incident:assigned') || hasAccess(role, 'incident:all') || hasAccess(role, 'analytics:view');
}

function seesOwnReportsOnly(role) {
  return hasAccess(role, 'report:own') && !canUseOperationalSearch(role);
}

function getSafeRole(role) {
  const normalizedRole = roleAliases[role] || role;
  return roles[normalizedRole] ? normalizedRole : 'student';
}

function formatRelativeTime(value) {
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

function mapReportRow(row) {
  return {
    ...row,
    assignedTo: row.assignedTo || row.assigned_to || 'Unassigned',
    reporter: row.reporter || row.reporter_name || 'Campus user',
    time: row.time || row.time_label || formatRelativeTime(row.created_at),
    progress: Number(row.progress ?? 0)
  };
}

function mapAlertRow(row) {
  return {
    ...row,
    time: row.time || row.time_label || formatRelativeTime(row.created_at)
  };
}

function buildAppSession(authSession, profile) {
  const user = authSession?.user;
  const metadata = user?.user_metadata || {};
  const role = getSafeRole(profile?.role || metadata.role);

  return {
    userId: user.id,
    email: user.email || '',
    role,
    name: profile?.name || metadata.name || user.email?.split('@')[0] || roles[role].label,
    department: profile?.department || metadata.department || ''
  };
}

async function loadProfileForSession(authSession) {
  const user = authSession?.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('id, role, name, department')
    .eq('id', user.id)
    .maybeSingle();

  if (error) throw error;
  if (data) return data;

  const metadata = user.user_metadata || {};
  const requestedRole = selfServiceRoles.includes(metadata.role) ? metadata.role : 'student';
  const fallbackProfile = {
    id: user.id,
    name: metadata.name || user.email?.split('@')[0] || 'Campus User',
    role: requestedRole,
    department: metadata.department || null
  };

  const { data: createdProfile, error: createError } = await supabase
    .from('profiles')
    .insert([fallbackProfile])
    .select('id, role, name, department')
    .single();

  if (createError) throw createError;
  return createdProfile;
}

const incidents = [
  {
    id: 'HAZ-2904',
    title: 'Chemical Leak - Block C-14',
    category: 'Laboratory',
    location: 'Science Complex, Lab 4B',
    severity: 'critical',
    status: 'In Progress',
    reporter: 'Dr. Ifeoma N.',
    assignedTo: 'Safety Response Unit',
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
    body: 'Avoid Block C corridor until the safety team completes containment.'
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
  'Safety Response Unit updated HAZ-2904 to In Progress.',
  'New evidence uploaded for HAZ-1841.',
  'Sanitation Unit requested verification for HAZ-1377.',
  'Campus alert published for Science Complex.'
];

function App() {
  const [authSession, setAuthSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [authError, setAuthError] = useState('');
  const [desktopView, setDesktopView] = useState('command');
  const [mobileView, setMobileView] = useState('dashboard');

  const [incidentsList, setIncidentsList] = useState(incidents);
  const [alertsList, setAlertsList] = useState(alerts);
  const [activityList, setActivityList] = useState(activity);
  const [loading, setLoading] = useState(false);

  const appSession = useMemo(
    () => (authSession && profile ? buildAppSession(authSession, profile) : null),
    [authSession, profile]
  );
  const visibleIncidentsList = useMemo(() => {
    if (!appSession || !seesOwnReportsOnly(appSession.role)) {
      return incidentsList;
    }

    return incidentsList.filter((incident) => {
      const reporterId = incident.reporter_id || incident.reporterId;
      return reporterId === appSession.userId;
    });
  }, [appSession, incidentsList]);
  const activeIncident = visibleIncidentsList[0] || incidentsList[0] || incidents[0];

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    let isMounted = true;

    async function hydrateSession(nextSession) {
      if (!nextSession) {
        if (!isMounted) return;
        setAuthSession(null);
        setProfile(null);
        setAuthLoading(false);
        return;
      }

      setAuthLoading(true);
      try {
        const loadedProfile = await loadProfileForSession(nextSession);
        if (!isMounted) return;
        setAuthSession(nextSession);
        setProfile(loadedProfile);
        setAuthError('');
      } catch (err) {
        console.error('Unable to load Supabase profile:', err);
        if (!isMounted) return;
        setAuthSession(null);
        setProfile(null);
        setAuthError('We could not load your dashboard profile. Please contact an administrator.');
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    }

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) throw error;
        hydrateSession(data.session);
      })
      .catch((err) => {
        console.error('Unable to restore Supabase session:', err);
        if (!isMounted) return;
        setAuthError('We could not restore your secure session. Please sign in again.');
        setAuthLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      hydrateSession(nextSession);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const refreshData = async () => {
    if (!isSupabaseConfigured || !appSession) return;

    setLoading(true);
    try {
      const { data: reportData, error: reportErr } = await supabase
        .from('hazard_reports')
        .select('*')
        .order('created_at', { ascending: false });
      if (reportErr) throw reportErr;
      setIncidentsList((reportData || []).map(mapReportRow));

      const { data: alertData, error: alertErr } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });
      if (alertErr) throw alertErr;
      setAlertsList((alertData || []).map(mapAlertRow));

      const { data: logData, error: logErr } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false });
      if (logErr) throw logErr;
      setActivityList((logData || []).map(log => log.description));
    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReportCreated = (newReport) => {
    const mappedReport = mapReportRow(newReport);
    setIncidentsList((currentReports) => [
      mappedReport,
      ...currentReports.filter((report) => report.id !== mappedReport.id)
    ]);
  };

  useEffect(() => {
    refreshData();
  }, [appSession?.userId]);

  const handleLogout = async () => {
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setAuthSession(null);
      setProfile(null);
      setIncidentsList(incidents);
      setAlertsList(alerts);
      setActivityList(activity);
    }
  };

  const metrics = useMemo(() => {
    const activeCount = visibleIncidentsList.filter(i => i.status !== 'Resolved' && i.status !== 'Closed').length;
    const resolvedCount = visibleIncidentsList.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
    return [
      { label: 'Active Hazards', value: String(activeCount), trend: '+3 today', tone: 'critical', icon: Siren },
      { label: 'Resolved Today', value: String(resolvedCount), trend: '+18%', tone: 'safe', icon: CheckCircle2 },
      { label: 'Avg. Response', value: '04:12', trend: '22 min faster', tone: 'neutral', icon: Clock3 },
      { label: 'Compliance', value: '94.8%', trend: 'Annual score', tone: 'safe', icon: ClipboardCheck }
    ];
  }, [visibleIncidentsList]);

  if (!appSession) {
    return <PublicGateway authLoading={authLoading} authError={authError} />;
  }

  return (
    <main className="app-shell">
      {loading && <div className="loading-banner">Loading real-time campus safety data...</div>}
      <DesktopApp
        view={desktopView}
        setView={setDesktopView}
        metrics={metrics}
        activeIncident={activeIncident}
        session={appSession}
        onLogout={handleLogout}
        incidentsList={visibleIncidentsList}
        alertsList={alertsList}
        activityList={activityList}
        refreshData={refreshData}
        onReportCreated={handleReportCreated}
      />
      <MobileApp
        view={mobileView}
        setView={setMobileView}
        activeIncident={activeIncident}
        session={appSession}
        onLogout={handleLogout}
        incidentsList={visibleIncidentsList}
        alertsList={alertsList}
        activityList={activityList}
        refreshData={refreshData}
        onReportCreated={handleReportCreated}
      />
    </main>
  );
}

function PublicGateway({ authLoading, authError }) {
  const [authModal, setAuthModal] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('student');
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  const isSignUp = authModal === 'signUp';

  const openAuthModal = (nextMode) => {
    setAuthModal(nextMode);
    setFormError('');
    setFormMessage('');
  };

  const closeAuthModal = () => {
    setAuthModal(null);
    setFormError('');
    setFormMessage('');
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    setFormMessage('');

    if (!isSupabaseConfigured) {
      setFormError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to continue.');
      return;
    }

    if (!email || !password || (isSignUp && !name)) {
      setFormError('Please complete the required fields.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              department,
              role
            }
          }
        });
        if (error) throw error;

        if (!data.session) {
          setFormMessage('Account created. Check your email to confirm access before signing in.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setFormError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="public-shell">
      <header className="public-header">
        <Brand />
        <nav className="public-nav" aria-label="Landing page navigation">
          <a href="#safety-guide">Safety guide</a>
          <a href="#get-started">Get started</a>
          <a href="#dashboards">Dashboards</a>
        </nav>
        <div className="public-header-actions">
          <button className="ghost-button" type="button" onClick={() => openAuthModal('signIn')}>
            <LogIn size={17} /> Sign In
          </button>
          <button className="primary-button" type="button" onClick={() => openAuthModal('signUp')}>
            <UserPlus size={17} /> Create Account
          </button>
        </div>
      </header>

      <section className="public-hero">
        <div className="public-hero-copy">
          <p className="eyebrow">COUU Environmental Health and Safety</p>
          <h1>Report campus hazards before they become emergencies.</h1>
          <p>
            COUU-EHS gives students and staff a simple way to report unsafe conditions, track
            progress, and receive safety notices while admins coordinate response from one place.
          </p>
          <div className="landing-actions">
            <button className="primary-button" type="button" onClick={() => openAuthModal('signIn')}>
              <LogIn size={18} /> Sign In
            </button>
            <button className="secondary-button" type="button" onClick={() => openAuthModal('signUp')}>
              <UserPlus size={18} /> Create Account
            </button>
          </div>
          <div className="hero-stats" aria-label="COUU-EHS service highlights">
            <span><strong>3</strong> focused dashboards</span>
            <span><strong>24/7</strong> hazard logging</span>
            <span><strong>1</strong> campus safety record</span>
          </div>
        </div>
        <div className="public-card hero-card glass-panel">
          <div className="hero-card-top">
            <ShieldCheck size={32} />
            <span>Live safety workflow</span>
          </div>
          <h2>From report to resolution</h2>
          <div className="hero-steps">
            <p><span>01</span> Submit the hazard with location and severity.</p>
            <p><span>02</span> Track review, assignment, and response updates.</p>
            <p><span>03</span> Receive alerts when an area needs attention.</p>
          </div>
        </div>
      </section>

      <section className="public-grid" id="safety-guide">
        <article className="glass-panel public-info-card">
          <h2>
            What to report
            <GuideTip title="Report criteria">
              Report anything that could harm people, interrupt safe learning, or damage campus facilities. If you are unsure, submit it and let EHS review it.
            </GuideTip>
          </h2>
          <ul>
            <li>Waste buildup, sanitation issues, and blocked drainage.</li>
            <li>Faulty lighting, damaged railings, unsafe buildings, or exposed wiring.</li>
            <li>Laboratory spills, fire risks, blocked exits, and urgent safety concerns.</li>
          </ul>
        </article>
        <article className="glass-panel public-info-card restricted">
          <h2>
            Before you submit
            <GuideTip title="Useful details">
              Add the location, risk level, and a short description. Photos help, but only take them when it is safe.
            </GuideTip>
          </h2>
          <ul>
            <li>Give the exact location, including building, floor, room, or landmark.</li>
            <li>Add a clear photo when it is safe to do so.</li>
            <li>Choose the closest severity level so the response team can prioritize.</li>
          </ul>
        </article>
        <article className="glass-panel public-info-card">
          <h2>
            After reporting
            <GuideTip title="Tracking">
              Your dashboard shows reports you submitted, their current status, and response progress as the safety team works on them.
            </GuideTip>
          </h2>
          <ul>
            <li>Your report receives a tracking record.</li>
            <li>The safety team reviews and updates the response status.</li>
            <li>You can return to your dashboard to check progress and alerts.</li>
          </ul>
        </article>
        <article className="glass-panel public-info-card">
          <h2>
            If it is urgent
            <GuideTip title="Emergency guidance">
              For immediate danger, move away first and use campus emergency channels. COUU-EHS records the issue, but it does not replace emergency response.
            </GuideTip>
          </h2>
          <ul>
            <li>Move away from immediate danger first.</li>
            <li>Warn nearby students or staff where safe.</li>
            <li>Use campus emergency channels for life-threatening situations.</li>
          </ul>
        </article>
      </section>

      <section className="role-login glass-panel" id="get-started">
        <div>
          <p className="eyebrow">Get started</p>
          <h2>Access your campus safety dashboard</h2>
          <p>Use your account to submit reports, monitor updates, and receive safety alerts relevant to your role.</p>
        </div>
        <div className="auth-cta-group">
          <button className="primary-button" type="button" onClick={() => openAuthModal('signIn')}>
            <LogIn size={18} /> Sign In
          </button>
          <button className="ghost-button" type="button" onClick={() => openAuthModal('signUp')}>
            <UserPlus size={18} /> Create Account
          </button>
          {authError && <p className="auth-error">{authError}</p>}
        </div>
      </section>

      <section className="role-login dashboard-routes glass-panel" id="dashboards">
        <div>
          <p className="eyebrow">Who uses COUU-EHS</p>
          <h2>Three focused dashboards for campus safety</h2>
          <p>Students and staff focus on reporting and updates. Admins handle review, response, alerts, analytics, and compliance follow-up.</p>
        </div>
        <div className="role-grid">
          {dashboardRoles.map((role) => {
            const config = roles[role];
            return (
              <article key={role} className="role-card static">
                <strong>{config.label}</strong>
                <span>{config.description}</span>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="public-footer">
        <Brand />
        <div>
          <strong>Campus safety, clearer and faster.</strong>
          <p>Use COUU-EHS to report hazards early, follow response progress, and stay informed about environmental health notices.</p>
        </div>
        <div className="footer-links">
          <a href="#safety-guide">Safety guide</a>
          <a href="#get-started">Get started</a>
          <a href="#dashboards">Dashboards</a>
        </div>
      </footer>

      {authModal && (
        <AuthModal
          mode={authModal}
          setMode={setAuthModal}
          closeAuthModal={closeAuthModal}
          handleAuthSubmit={handleAuthSubmit}
          submitting={submitting}
          authLoading={authLoading}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          department={department}
          setDepartment={setDepartment}
          role={role}
          setRole={setRole}
          formError={formError}
          authError={authError}
          formMessage={formMessage}
        />
      )}
    </main>
  );
}

function AuthModal({
  mode,
  setMode,
  closeAuthModal,
  handleAuthSubmit,
  submitting,
  authLoading,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  department,
  setDepartment,
  role,
  setRole,
  formError,
  authError,
  formMessage
}) {
  const isSignUp = mode === 'signUp';

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={closeAuthModal}>
      <section className="modal-card auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header">
          <div>
            <p className="eyebrow">Secure access</p>
            <h2 id="auth-modal-title">{isSignUp ? 'Create your COUU-EHS account' : 'Sign in to COUU-EHS'}</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close authentication modal" onClick={closeAuthModal}>
            <X size={18} />
          </button>
        </header>

        <form className="auth-form" onSubmit={handleAuthSubmit}>
          <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
            <button className={!isSignUp ? 'active' : ''} type="button" onClick={() => setMode('signIn')}>
              <LogIn size={16} /> Sign in
            </button>
            <button className={isSignUp ? 'active' : ''} type="button" onClick={() => setMode('signUp')}>
              <UserPlus size={16} /> Create account
            </button>
          </div>

          {isSignUp && (
            <div className="form-grid">
              <label>
                <FieldLabel label="Full Name *" />
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
              </label>
              <label>
                <FieldLabel label="Department" />
                <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Faculty / unit" />
              </label>
              <label>
                <FieldLabel label="Account Type" />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  {selfServiceRoles.map((roleId) => (
                    <option key={roleId} value={roleId}>{roles[roleId].label}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <label>
            <FieldLabel label="Email Address *" />
            <div className="input-with-icon">
              <Mail size={16} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@coou.edu.ng"
                type="email"
                autoComplete="email"
                required
              />
            </div>
          </label>
          <label>
            <FieldLabel label="Password *" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secure password"
              type="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              minLength="6"
              required
            />
          </label>

          {(formError || authError) && <p className="auth-error">{formError || authError}</p>}
          {formMessage && <p className="auth-message">{formMessage}</p>}

          <button className="primary-button" type="submit" disabled={submitting || authLoading}>
            {isSignUp ? <UserPlus size={18} /> : <LogIn size={18} />}
            {submitting || authLoading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </section>
    </div>
  );
}

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <img src={LOGO_URL} alt={`${BRAND_NAME} logo`} />
      {!compact && (
        <div>
          <strong>{BRAND_NAME}</strong>
        </div>
      )}
    </div>
  );
}

function DesktopApp({ view, setView, metrics, activeIncident, session, onLogout, incidentsList, alertsList, activityList, refreshData, onReportCreated }) {
  const role = session.role;
  const [profileOpen, setProfileOpen] = useState(false);
  const desktopViews = [
    { id: 'command', label: 'Dashboard', icon: LayoutDashboard, permission: 'incident:assigned' },
    { id: 'myReports', label: 'My Reports', icon: FileText, permission: 'report:own' },
    { id: 'report', label: 'Hazard Reports', icon: AlertTriangle, permission: 'report:create' },
    { id: 'timeline', label: 'Incident Timeline', icon: FileText, permission: 'incident:resolve' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, permission: 'analytics:view' }
  ].filter((item) => hasAccess(role, item.permission) || (item.id === 'command' && hasAccess(role, 'incident:all')));
  const allowedViewIds = desktopViews.map((item) => item.id);

  useEffect(() => {
    if (!allowedViewIds.includes(view)) {
      setView(defaultDesktopViewByRole[role] || allowedViewIds[0] || 'report');
    }
  }, [allowedViewIds, role, setView, view]);

  const activeView = allowedViewIds.includes(view) ? view : (defaultDesktopViewByRole[role] || allowedViewIds[0]);

  return (
    <section className="desktop-app">
      <aside className="sidebar">
        <Brand compact />
        <nav>
          {desktopViews.map((item) => (
            <NavButton key={item.id} icon={item.icon} label={item.label} active={activeView === item.id} onClick={() => setView(item.id)} />
          ))}
          {hasAccess(role, 'admin:manage') && <NavButton icon={Settings} label="Settings" />}
        </nav>
        <button className="emergency-button"><Siren size={18} /><span className="button-label">Emergency</span></button>
      </aside>

      <div className="desktop-main">
        <header className="topbar">
          <Brand />
          <div className="desktop-tabs">
            {desktopViews.slice(0, 3).map((item) => (
              <button key={item.id} className={activeView === item.id ? 'active' : ''} onClick={() => setView(item.id)}>{item.label}</button>
            ))}
          </div>
          <div className="topbar-actions">
            {canUseOperationalSearch(role) && (
              <label className="search-box">
                <Search size={16} />
                <input placeholder="Search incident, protocol, unit..." />
              </label>
            )}
            <AccessBadge role={role} />
            <button className="icon-button" aria-label="Notifications"><Bell size={20} /></button>
            <button className="icon-button" aria-label="Open profile" onClick={() => setProfileOpen(true)}><UserCircle size={20} /></button>
          </div>
        </header>

        {activeView === 'command' && <Protected permission="incident:assigned" role={role} fallbackPermission="incident:all"><CommandCenter metrics={metrics} role={role} incidentsList={incidentsList} /></Protected>}
        {activeView === 'myReports' && <Protected permission="report:own" role={role}><MyReports reports={incidentsList} role={role} /></Protected>}
        {activeView === 'report' && <Protected permission="report:create" role={role}><ReportHazard session={session} activityList={activityList} refreshData={refreshData} onReportCreated={onReportCreated} /></Protected>}
        {activeView === 'timeline' && <Protected permission="incident:resolve" role={role}><IncidentTimeline incident={activeIncident} role={role} refreshData={refreshData} /></Protected>}
        {activeView === 'analytics' && <Protected permission="analytics:view" role={role}><Analytics metrics={metrics} role={role} /></Protected>}
      </div>
      {profileOpen && <ProfileModal session={session} onClose={() => setProfileOpen(false)} onLogout={onLogout} />}
    </section>
  );
}

function AccessBadge({ role }) {
  return (
    <span className="access-badge">
      <ShieldCheck size={15} />
      {roles[role]?.label || role}
    </span>
  );
}

function Protected({ role, permission, fallbackPermission, children }) {
  if (hasAccess(role, permission) || (fallbackPermission && hasAccess(role, fallbackPermission))) {
    return children;
  }

  return <RestrictedScreen role={role} permission={permission} />;
}

function RestrictedScreen({ role, permission }) {
  return (
    <section className="screen">
      <div className="restricted-screen glass-panel">
        <ShieldCheck size={40} />
        <p className="eyebrow">Restricted area</p>
        <h1>Access is limited for {roles[role]?.label || role}</h1>
        <p>This screen requires the permission `{permission}`. Sensitive EHS operational data is hidden unless the signed-in role needs it.</p>
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

function CommandCenter({ metrics, incidentsList }) {
  return (
    <div className="screen desktop-grid">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Real-time safety intelligence</p>
          <h1>
            Admin Command Center
            <GuideTip title="Dashboard guide">
              This workspace is for reviewing live reports, narrowing them by category or severity, and deciding which incidents need response first.
            </GuideTip>
          </h1>
          <p>Monitor active hazards, assign response units, and keep COUU facilities compliant.</p>
        </div>
        <button className="secondary-button"><Download size={18} /> Shift Report</button>
      </section>

      <aside className="filter-panel glass-panel">
        <h2>
          <Filter size={18} /> Filters
          <GuideTip title="Using filters">
            Filters help admins focus on a specific hazard type, priority level, or campus area before assigning response work.
          </GuideTip>
        </h2>
        <FieldLabel
          label="Hazard Category"
          guide="Use categories to group similar risks such as laboratory, infrastructure, waste, or electrical issues."
        />
        <CheckRow label="Laboratory" checked />
        <CheckRow label="Infrastructure" checked />
        <CheckRow label="Waste Management" />
        <CheckRow label="Electrical" />
        <FieldLabel
          label="Priority Level"
          guide="Critical means immediate danger, Warning means urgent follow-up, and Stable means the area still needs review but is not escalating."
        />
        <div className="chip-grid">
          <SeverityChip severity="critical" label="Critical" />
          <SeverityChip severity="high" label="Warning" />
          <SeverityChip severity="low" label="Stable" />
        </div>
        <FieldLabel
          label="Facility Location"
          guide="Select a campus zone to focus the feed on reports from that location."
        />
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
          <h2>
            Active Incident Feed
            <GuideTip title="Incident cards">
              Each card shows severity, location, timing, assigned unit, and progress so admins can quickly decide the next action.
            </GuideTip>
          </h2>
          <div className="view-toggle">
            <button className="active">Grid</button>
            <button>List</button>
          </div>
        </div>
        <div className="incident-grid">
          {incidentsList.slice(0, 8).map((incident) => <IncidentCard key={incident.id} incident={incident} />)}
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
      <h2>
        Campus Heat Map
        <GuideTip title="Heat map guide">
          Pins show where active risks are concentrated so admins can spot repeated problem areas.
        </GuideTip>
      </h2>
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
      <h2>
        Urgent Protocols
        <GuideTip title="Protocol guide">
          Use these response shortcuts for common emergency workflows that need fast coordination.
        </GuideTip>
      </h2>
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

function ReportHazard({ session, activityList, refreshData, onReportCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Infrastructure');
  const [location, setLocation] = useState('');
  const [reporter, setReporter] = useState(session?.name || '');
  const [severity, setSeverity] = useState('high');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setReporter(session?.name || '');
  }, [session?.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location || !reporter || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);
    const reportId = `HAZ-${Math.floor(1000 + Math.random() * 9000)}`;
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
      progress: 10
    };

    try {
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
      setReporter('');
      setDescription('');
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
        <div className="upload-zone">
          <Camera size={28} />
          <strong>Upload photo or document evidence</strong>
          <span>PNG, JPG, or PDF up to 10MB</span>
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

function IncidentTimeline({ incident, refreshData }) {
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

function Analytics({ metrics }) {
  return (
    <div className="screen analytics-screen">
      <section className="page-heading full">
        <div>
          <p className="eyebrow">Compliance and performance audit</p>
          <h1>
            Executive Analytics
            <GuideTip title="Analytics guide">
              This dashboard summarizes safety performance, recurring hazard patterns, and compliance observations for decision makers.
            </GuideTip>
          </h1>
          <p>Track institutional safety performance and recurring environmental health risks.</p>
        </div>
        <button className="secondary-button"><Download size={18} /> Export Audit</button>
      </section>

      <div className="metric-grid four">
        {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </div>

      <section className="glass-panel chart-panel">
        <div className="section-title">
          <h2>
            Incident Trends
            <GuideTip title="Trend view">
              Compare periods to spot recurring risks, slower response areas, or locations that need preventive action.
            </GuideTip>
          </h2>
          <div className="view-toggle"><button className="active">Monthly</button><button>Quarterly</button></div>
        </div>
        <div className="bar-chart">
          {[42, 58, 36, 72, 64, 48, 78, 54].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </section>

      <section className="glass-panel audit-table">
        <h2>
          Audit Observations
          <GuideTip title="Audit notes">
            These items highlight compliance issues and improvements that admins should review during safety planning.
          </GuideTip>
        </h2>
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

function MobileApp({ view, setView, activeIncident, session, onLogout, incidentsList, alertsList, activityList, refreshData, onReportCreated }) {
  const role = session.role;
  const [profileOpen, setProfileOpen] = useState(false);
  const mobileViews = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, permission: 'report:own', fallbackPermission: 'incident:all' },
    { id: 'myReports', label: 'My Reports', icon: FileText, permission: 'report:own' },
    { id: 'report', label: 'Report', icon: Plus, permission: 'report:create' },
    { id: 'tracker', label: 'Tracker', icon: ClipboardCheck, permission: 'report:own', fallbackPermission: 'incident:resolve' },
    { id: 'alerts', label: 'Alerts', icon: Bell, permission: 'alerts:view', fallbackPermission: 'alerts:manage' }
  ].filter((item) => hasAccess(role, item.permission) || (item.fallbackPermission && hasAccess(role, item.fallbackPermission)));
  const allowedViewIds = mobileViews.map((item) => item.id);

  useEffect(() => {
    if (!allowedViewIds.includes(view)) {
      setView(defaultMobileViewByRole[role] || allowedViewIds[0] || 'alerts');
    }
  }, [allowedViewIds, role, setView, view]);

  const activeView = allowedViewIds.includes(view) ? view : (defaultMobileViewByRole[role] || allowedViewIds[0]);

  return (
    <section className="mobile-app">
      <header className="mobile-header">
        <Brand />
        <AccessBadge role={role} />
        <button className="icon-button" aria-label="Open profile" onClick={() => setProfileOpen(true)}><UserCircle size={20} /></button>
      </header>

      {activeView === 'dashboard' && <Protected role={role} permission="report:own"><MobileDashboard incidentsList={incidentsList} activityList={activityList} role={role} /></Protected>}
      {activeView === 'myReports' && <Protected role={role} permission="report:own"><MyReports reports={incidentsList} role={role} compact /></Protected>}
      {activeView === 'report' && <Protected role={role} permission="report:create"><MobileReport session={session} refreshData={refreshData} onReportCreated={onReportCreated} /></Protected>}
      {activeView === 'tracker' && <Protected role={role} permission="report:own" fallbackPermission="incident:resolve"><MobileTracker incident={activeIncident} /></Protected>}
      {activeView === 'alerts' && <Protected role={role} permission="alerts:view" fallbackPermission="alerts:manage"><MobileAlerts role={role} alertsList={alertsList} /></Protected>}

      <nav className="mobile-nav">
        {mobileViews.map((item) => (
          <MobileNavButton key={item.id} icon={item.icon} label={item.label} active={activeView === item.id} onClick={() => setView(item.id)} />
        ))}
      </nav>
      {profileOpen && <ProfileModal session={session} onClose={() => setProfileOpen(false)} onLogout={onLogout} />}
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

function MobileDashboard({ incidentsList, activityList, role }) {
  const ownsOnly = seesOwnReportsOnly(role);
  const totalReports = incidentsList.length;
  const resolvedReports = incidentsList.filter(i => i.status === 'Resolved').length;
  const latestReports = (incidentsList || []).slice(0, 2);

  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">My safety impact</p>
        <h1>
          {ownsOnly ? 'My Safety Dashboard' : 'Campus Dashboard'}
          <GuideTip title="Dashboard guide">
            Use this screen to check your submitted reports, resolved cases, recent updates, and the next safety action you may need to take.
          </GuideTip>
        </h1>
      </section>
      <div className="mobile-metrics">
        <MetricMini value={String(totalReports)} label={ownsOnly ? 'My Reports' : 'Total Reports'} />
        <MetricMini value={String(resolvedReports)} label="Resolved Cases" />
      </div>
      <div className="section-title">
        <h2>
          {ownsOnly ? 'Latest Reports' : 'Active Reports'}
          <GuideTip title="Report list">
            These are the newest reports visible to your role. Students and staff only see reports they submitted.
          </GuideTip>
        </h2>
      </div>
      {latestReports.length > 0 ? (
        latestReports.map((incident) => <MobileReportCard key={incident.id} incident={incident} />)
      ) : (
        <div className="mobile-empty-state glass-panel">
          <FileText size={24} />
          <h3>No reports yet</h3>
          <p>Reports you submit will appear here with their latest response status.</p>
        </div>
      )}
      <div className="section-title">
        <h2>
          Recent Activity
          <GuideTip title="Activity updates">
            Activity entries show report submissions, response updates, and system notes relevant to your dashboard.
          </GuideTip>
        </h2>
      </div>
      <div className="mobile-activity glass-panel">
        {(activityList || []).slice(0, 3).map((item, idx) => <p key={idx}>{item}</p>)}
      </div>
    </div>
  );
}

function MyReports({ reports, role, compact = false }) {
  const ownsOnly = seesOwnReportsOnly(role);
  const activeReports = (reports || []).filter((report) => report.status !== 'Resolved' && report.status !== 'Closed');
  const resolvedReports = (reports || []).filter((report) => report.status === 'Resolved' || report.status === 'Closed');

  return (
    <div className={compact ? 'mobile-screen my-reports-compact' : 'screen my-reports-screen'}>
      <section className={compact ? 'mobile-hero' : 'page-heading full'}>
        <div>
          <p className="eyebrow">{ownsOnly ? 'Submitted by you' : 'Report records'}</p>
          <h1>
            My Reports
            <GuideTip title="My Reports guide">
              This tab keeps the hazard reports you submitted in one place so you can follow status, location, severity, and progress.
            </GuideTip>
          </h1>
          <p>{ownsOnly ? 'Track the hazards you have submitted and follow their response status.' : 'Review submitted reports available to your role.'}</p>
        </div>
      </section>

      <div className="my-report-summary">
        <MetricMini value={String((reports || []).length)} label="All Reports" guide="Total reports visible in this tab." />
        <MetricMini value={String(activeReports.length)} label="Active" guide="Reports still waiting for review, assignment, or resolution." />
        <MetricMini value={String(resolvedReports.length)} label="Resolved" guide="Reports marked resolved or closed after response work." />
      </div>

      <section className="my-report-list">
        {(reports || []).length > 0 ? (
          (reports || []).map((report) => (
            <article key={report.id} className={`glass-panel my-report-row ${report.severity}`}>
              <div>
                <SeverityChip severity={report.severity} />
                <span className="report-code">{report.id}</span>
              </div>
              <h2>{report.title}</h2>
              <p>{report.description}</p>
              <div className="incident-meta">
                <span><MapPin size={15} />{report.location}</span>
                <span><Clock3 size={15} />{report.time}</span>
                <span><ClipboardCheck size={15} />{report.status}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="mobile-empty-state glass-panel">
            <FileText size={24} />
            <h3>No reports yet</h3>
            <p>Once you submit a hazard report, it will appear in this tab for tracking.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function MobileReport({ session, refreshData, onReportCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electrical');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('high');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title || !location || !description) {
      alert('Please fill out all fields.');
      return;
    }

    setSubmitting(true);
    const reportId = `HAZ-${Math.floor(1000 + Math.random() * 9000)}`;
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
      progress: 10
    };

    try {
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
      <div className="upload-zone compact">
        <Camera size={24} />
        <strong>
          Add visual evidence
          <GuideTip title="Evidence guide">
            Add a clear photo when safe. Skip this if taking a photo would put you near danger.
          </GuideTip>
        </strong>
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

function MobileTracker({ incident }) {
  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">Incident #{incident.id}</p>
        <h1>
          {incident.title}
          <GuideTip title="Tracker guide">
            Follow where your report is in the response process and enable update notifications when needed.
          </GuideTip>
        </h1>
      </section>
      <article className="glass-panel tracker-card">
        <div>
          <span>Risk</span>
          <strong>{incident.severity.toUpperCase()} Risk</strong>
        </div>
        <div>
          <span>Category</span>
          <strong>{incident.category}</strong>
        </div>
      </article>
      <section className="glass-panel mini-timeline">
        <h2>
          Resolution Progress
          <GuideTip title="Progress stages">
            Each stage shows whether your report is still submitted, assigned, in progress, or resolved.
          </GuideTip>
        </h2>
        {['Reported', 'Assigned', 'In Progress', 'Resolved'].map((step, index) => {
          const isDone =
            (step === 'Reported') ||
            (step === 'Assigned' && incident.status !== 'Reported') ||
            (step === 'In Progress' && incident.status !== 'Reported' && incident.status !== 'Assigned') ||
            (step === 'Resolved' && incident.status === 'Resolved');
          return (
            <div key={step} className={isDone ? 'done' : ''}>
              <span />
              <p>{step}</p>
            </div>
          );
        })}
      </section>
      <button className="primary-button mobile-submit" type="button"><Bell size={18} /> Notify Me on Updates</button>
      <button className="ghost-button mobile-submit" type="button">Share Report</button>
    </div>
  );
}

function MobileAlerts({ role, alertsList }) {
  return (
    <div className="mobile-screen">
      <section className="mobile-hero">
        <p className="eyebrow">Live campus notices</p>
        <h1>
          Campus Alerts
          <GuideTip title="Alert guide">
            Alerts communicate campus safety notices, affected locations, and timing for issues that users should know about.
          </GuideTip>
        </h1>
      </section>
      {(alertsList || []).map((alert) => (
        <article key={alert.id || alert.title} className={`mobile-alert glass-panel ${alert.severity}`}>
          <SeverityChip severity={alert.severity} />
          <h2>{alert.title}</h2>
          <p>{alert.body}</p>
          <span><MapPin size={15} />{alert.location}</span>
          <small>{alert.time_label || alert.time}</small>
        </article>
      ))}
      <section className="assist-card">
        <Siren size={28} />
        <div>
          <h2>
            Immediate Assistance?
            <GuideTip title="Emergency help">
              Use emergency response for immediate danger. Submit a COUU-EHS report afterward when it is safe.
            </GuideTip>
          </h2>
          <p>Call campus emergency response.</p>
        </div>
      </section>
    </div>
  );
}

function MetricMini({ value, label, guide }) {
  return (
    <article className="glass-panel metric-mini">
      <strong>{value}</strong>
      <span>
        {label}
        {guide && <GuideTip title={label}>{guide}</GuideTip>}
      </span>
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

function CategoryButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={`category-button ${active ? 'active' : ''}`} type="button" onClick={onClick}>
      <Icon size={22} />
      <span>{label}</span>
    </button>
  );
}

function ProfileModal({ session, onClose, onLogout }) {
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
          <button className="ghost-button" type="button" onClick={onClose}>Close</button>
          <button className="secondary-button" type="button" onClick={onLogout}>Sign Out</button>
        </div>
      </section>
    </div>
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

function GuideTip({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="guide-button"
        type="button"
        aria-label={`Open guide: ${title}`}
        onClick={() => setOpen(true)}
      >
        <Info size={14} />
      </button>
      {open && createPortal(
        <div className="modal-backdrop guide-modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="modal-card guide-modal"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="modal-header">
              <div>
                <p className="eyebrow">Quick guide</p>
                <h2>{title}</h2>
              </div>
              <button className="icon-button" type="button" aria-label="Close guide" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </header>
            <p>{children}</p>
          </section>
        </div>,
        document.body
      )}
    </>
  );
}

function FieldLabel({ label, guide, guideTitle }) {
  return (
    <span className="field-label">
      {label}
      {guide && <GuideTip title={guideTitle || label}>{guide}</GuideTip>}
    </span>
  );
}

function SeverityChip({ severity, label }) {
  return <span className={`severity-chip ${severity}`}>{label || severity}</span>;
}

createRoot(document.getElementById('root')).render(<App />);
