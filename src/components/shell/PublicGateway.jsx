import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X, Menu, LogIn, UserPlus, ShieldCheck, ClipboardCheck, Bell, Siren, Mail } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import { roles, selfServiceRoles } from '../../lib/access';
import { createLandingMotion } from '../../lib/landingMotion';
import Brand from '../common/Brand';
import GuideTip from '../common/GuideTip';
import FieldLabel from '../common/FieldLabel';
import { useCampusSafety } from '../../lib/CampusSafetyProvider';

export function AuthModal({
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
            <h2 id="auth-modal-title">{isSignUp ? 'Create your COOU-EHS account' : 'Sign in to COOU-EHS'}</h2>
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

export default function PublicGateway({ authLoading, authError }) {
  const { loginOffline } = useCampusSafety();
  const [authModal, setAuthModal] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('student');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');
  const prefersReducedMotion = useReducedMotion();
  const landingMotion = useMemo(() => createLandingMotion(prefersReducedMotion), [prefersReducedMotion]);
  const landingViewport = useMemo(() => ({ once: true, amount: 0.18 }), []);

  const isSignUp = authModal === 'signUp';

  const openAuthModal = (nextMode) => {
    setAuthModal(nextMode);
    setMobileMenuOpen(false);
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
      if (!email || !password || (isSignUp && !name)) {
        setFormError('Please complete the required fields.');
        return;
      }
      setSubmitting(true);
      setTimeout(() => {
        const mockUser = {
          id: 'offline-user-' + Math.random().toString(36).substring(2),
          email: email,
          user_metadata: {
            name: name || email.split('@')[0],
            department: department || 'Offline Unit',
            role: role || 'student'
          }
        };
        const mockProfile = {
          id: mockUser.id,
          role: role || 'student',
          name: name || email.split('@')[0],
          department: department || 'Offline Unit'
        };
        const mockSession = {
          user: mockUser,
          access_token: 'mock-offline-token'
        };
        loginOffline(mockSession, mockProfile);
        setSubmitting(false);
      }, 800);
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
      console.error('Detailed Auth Error:', err);
      let errorMessage = 'Authentication failed. Please try again.';
      if (err) {
        if (typeof err === 'string') {
          errorMessage = err;
        } else if (err.message) {
          errorMessage = err.message;
        } else if (err.error_description) {
          errorMessage = err.error_description;
        } else {
          try {
            errorMessage = JSON.stringify(err, Object.getOwnPropertyNames(err));
          } catch (e) {
            errorMessage = String(err);
          }
        }
      }
      setFormError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="public-shell">
      <motion.header
        className={`public-header ${mobileMenuOpen ? 'menu-open' : ''}`}
        variants={landingMotion.header}
        initial="hidden"
        animate="show"
      >
        <Brand />
        <button
          className="public-menu-button"
          type="button"
          aria-label={mobileMenuOpen ? 'Close landing navigation' : 'Open landing navigation'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="public-menu-panel">
          <nav className="public-nav" aria-label="Landing page navigation">
            <a href="#safety-guide" onClick={() => setMobileMenuOpen(false)}>Safety guide</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <a href="#get-started" onClick={() => setMobileMenuOpen(false)}>Get started</a>
          </nav>
          <div className="public-header-actions">
            <button className="ghost-button" type="button" onClick={() => openAuthModal('signIn')}>
              <LogIn size={17} /> Sign In
            </button>
            <button className="primary-button" type="button" onClick={() => openAuthModal('signUp')}>
              <UserPlus size={17} /> Create Account
            </button>
          </div>
        </div>
      </motion.header>

      <motion.section
        className="public-hero"
        variants={landingMotion.section}
        initial="hidden"
        whileInView="show"
        viewport={landingViewport}
      >
        <motion.div className="public-hero-copy" variants={landingMotion.group}>
          <motion.p className="eyebrow" variants={landingMotion.item}>COOU Environmental Health and Safety</motion.p>
          <motion.h1 variants={landingMotion.item}>Report campus hazards before they become emergencies.</motion.h1>
          <motion.p variants={landingMotion.item}>
            COOU-EHS gives the campus community a simple way to report unsafe conditions, track
            progress, and receive safety notices while the safety team coordinates response.
          </motion.p>
          <motion.div className="landing-actions" variants={landingMotion.item}>
            <button className="primary-button" type="button" onClick={() => openAuthModal('signIn')}>
              <LogIn size={18} /> Sign In
            </button>
            <button className="secondary-button" type="button" onClick={() => openAuthModal('signUp')}>
              <UserPlus size={18} /> Create Account
            </button>
          </motion.div>
          <motion.div className="hero-stats" aria-label="COOU-EHS service highlights" variants={landingMotion.group}>
            <motion.span variants={landingMotion.item}><strong>Fast</strong> hazard reporting</motion.span>
            <motion.span variants={landingMotion.item}><strong>Clear</strong> follow-up updates</motion.span>
            <motion.span variants={landingMotion.item}><strong>Safer</strong> campus spaces</motion.span>
          </motion.div>
        </motion.div>
        <motion.div className="public-card hero-card glass-panel" variants={landingMotion.card}>
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
        </motion.div>
      </motion.section>

      <motion.section
        className="public-grid"
        id="safety-guide"
        variants={landingMotion.group}
        initial="hidden"
        whileInView="show"
        viewport={landingViewport}
      >
        <motion.article className="glass-panel public-info-card" variants={landingMotion.card}>
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
        </motion.article>
        <motion.article className="glass-panel public-info-card restricted" variants={landingMotion.card}>
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
        </motion.article>
        <motion.article className="glass-panel public-info-card" variants={landingMotion.card}>
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
        </motion.article>
        <motion.article className="glass-panel public-info-card" variants={landingMotion.card}>
          <h2>
            If it is urgent
            <GuideTip title="Emergency guidance">
              For immediate danger, move away first and use campus emergency channels. COOU-EHS records the issue, but it does not replace emergency response.
            </GuideTip>
          </h2>
          <ul>
            <li>Move away from immediate danger first.</li>
            <li>Warn nearby students or staff where safe.</li>
            <li>Use campus emergency channels for life-threatening situations.</li>
          </ul>
        </motion.article>
      </motion.section>

      <motion.section
        className="public-details"
        id="how-it-works"
        variants={landingMotion.section}
        initial="hidden"
        whileInView="show"
        viewport={landingViewport}
      >
        <motion.div className="section-intro" variants={landingMotion.group}>
          <p className="eyebrow">What first-time users should know</p>
          <motion.h2 variants={landingMotion.item}>COOU-EHS is for everyday safety concerns, not only emergencies.</motion.h2>
          <p>
            Use it when you notice unsafe spaces, sanitation concerns, facility damage, lab risks,
            blocked access routes, fire risks, or anything that may affect health and safety on campus.
          </p>
        </motion.div>
        <motion.div className="detail-card-grid" variants={landingMotion.group}>
          <motion.article className="glass-panel detail-card" variants={landingMotion.card}>
            <ClipboardCheck size={24} />
            <h3>Make the report easy to act on</h3>
            <p>Include the location, what you observed, how serious it looks, and whether anyone is already affected.</p>
          </motion.article>
          <motion.article className="glass-panel detail-card" variants={landingMotion.card}>
            <Bell size={24} />
            <h3>Check back for updates</h3>
            <p>After submitting, return to your account to see status changes and important safety notices.</p>
          </motion.article>
          <motion.article className="glass-panel detail-card" variants={landingMotion.card}>
            <Siren size={24} />
            <h3>Use emergency channels first</h3>
            <p>If someone is in immediate danger, move away, alert nearby people, and contact campus emergency response first.</p>
          </motion.article>
        </motion.div>
      </motion.section>

      <motion.section
        className="role-login glass-panel"
        id="get-started"
        variants={landingMotion.section}
        initial="hidden"
        whileInView="show"
        viewport={landingViewport}
      >
        <motion.div variants={landingMotion.item}>
          <p className="eyebrow">Get started</p>
          <h2>Access your campus safety account</h2>
          <p>Sign in or create an account to submit reports, monitor updates, and receive safety alerts relevant to you.</p>
        </motion.div>
        <motion.div className="auth-cta-group" variants={landingMotion.item}>
          <button className="primary-button" type="button" onClick={() => openAuthModal('signIn')}>
            <LogIn size={18} /> Sign In
          </button>
          <button className="ghost-button" type="button" onClick={() => openAuthModal('signUp')}>
            <UserPlus size={18} /> Create Account
          </button>
          {authError && <p className="auth-error">{authError}</p>}
        </motion.div>
      </motion.section>

      <motion.footer
        className="public-footer"
        variants={landingMotion.section}
        initial="hidden"
        whileInView="show"
        viewport={landingViewport}
      >
        <Brand />
        <div>
          <strong>Campus safety, clearer and faster.</strong>
          <p>Use COOU-EHS to report hazards early, follow response progress, and stay informed about environmental health notices.</p>
        </div>
        <div className="footer-links">
          <a href="#safety-guide">Safety guide</a>
          <a href="#how-it-works">How it works</a>
          <a href="#get-started">Get started</a>
        </div>
      </motion.footer>

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
