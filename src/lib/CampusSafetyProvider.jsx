'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { normalizeRole, normalizeSelfServiceRole, roles } from './access';
import { mapAlertRow, mapReportRow } from './dataMappers';

const CampusSafetyContext = createContext(null);

const fallbackIncidents = [
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
  }
];

const fallbackAlerts = [
  {
    title: 'Chemical Spill',
    location: 'Science Complex',
    severity: 'critical',
    time: 'Active now',
    body: 'Avoid Block C corridor until the safety team completes containment.'
  }
];

const fallbackActivity = [
  'Safety Response Unit updated HAZ-2904 to In Progress.',
  'New evidence uploaded for HAZ-1841.'
];

function buildAppSession(authSession, profile) {
  const user = authSession?.user;
  const metadata = user?.user_metadata || {};
  const role = normalizeRole(profile?.role || metadata.role);

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
  const requestedRole = normalizeSelfServiceRole(metadata.role);
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

export function CampusSafetyProvider({ children }) {
  const router = useRouter();
  const [authSession, setAuthSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);

  const [incidentsList, setIncidentsList] = useState(fallbackIncidents);
  const [alertsList, setAlertsList] = useState(fallbackAlerts);
  const [activityList, setActivityList] = useState(fallbackActivity);
  const [loading, setLoading] = useState(false);

  const appSession = useMemo(
    () => (authSession && profile ? buildAppSession(authSession, profile) : null),
    [authSession, profile]
  );

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
      console.error('Error fetching real-time data:', err);
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

  const handleLogout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('coou_ehs_offline_session');
      }
      setAuthSession(null);
      setProfile(null);
      setIncidentsList(fallbackIncidents);
      setAlertsList(fallbackAlerts);
      setActivityList(fallbackActivity);
      router.replace('/');
    }
  };

  const loginOffline = (mockSession, mockProfile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('coou_ehs_offline_session', JSON.stringify({ session: mockSession, profile: mockProfile }));
    }
    setAuthSession(mockSession);
    setProfile(mockProfile);
    router.replace(`/dashboard/${mockProfile.role}`);
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('coou_ehs_offline_session');
        if (saved) {
          try {
            const { session: s, profile: p } = JSON.parse(saved);
            setAuthSession(s);
            setProfile(p);
          } catch (e) {
            localStorage.removeItem('coou_ehs_offline_session');
          }
        }
      }
      setAuthLoading(false);
      return;
    }

    let isMounted = true;

    async function hydrateSession(nextSession) {
      if (!nextSession) {
        if (isMounted) {
          setAuthSession(null);
          setProfile(null);
          setAuthLoading(false);
        }
        return;
      }

      try {
        const loadedProfile = await loadProfileForSession(nextSession);
        if (isMounted) {
          setAuthSession(nextSession);
          setProfile(loadedProfile);
        }
      } catch (err) {
        console.error('Session hydration failed:', err);
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      hydrateSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      hydrateSession(nextSession);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (appSession) {
      refreshData();
    }
  }, [appSession?.userId]);

  const value = {
    appSession,
    authLoading,
    incidentsList,
    alertsList,
    activityList,
    loading,
    refreshData,
    handleReportCreated,
    handleLogout,
    loginOffline
  };

  return (
    <CampusSafetyContext.Provider value={value}>
      {children}
    </CampusSafetyContext.Provider>
  );
}

export function useCampusSafety() {
  const context = useContext(CampusSafetyContext);
  if (!context) {
    throw new Error('useCampusSafety must be used within a CampusSafetyProvider');
  }
  return context;
}
