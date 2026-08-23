'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import PublicGateway from '../components/shell/PublicGateway';
import { normalizeRole } from '../lib/access';

export default function RootPage() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    let isMounted = true;

    async function checkUser(session) {
      if (!session?.user) {
        if (isMounted) setAuthLoading(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) throw error;

        const role = normalizeRole(profile?.role || session.user.user_metadata?.role);

        if (isMounted) {
          router.replace(`/dashboard/${role}`);
        }
      } catch (err) {
        console.error('Error checking user session profile:', err);
        if (isMounted) {
          setAuthError('Unable to load account settings.');
          setAuthLoading(false);
        }
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      checkUser(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      checkUser(session);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <PublicGateway authLoading={authLoading} authError={authError} />
  );
}
