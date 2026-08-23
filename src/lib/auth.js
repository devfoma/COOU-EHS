'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCampusSafety } from './CampusSafetyProvider';
import { normalizeRole } from './access';

export function useRequireAuth(allowedRole = null) {
  const router = useRouter();
  const { appSession, authLoading } = useCampusSafety();

  useEffect(() => {
    if (authLoading) return;

    if (!appSession) {
      router.replace('/');
      return;
    }

    if (allowedRole && appSession.role !== normalizeRole(allowedRole)) {
      router.replace(`/dashboard/${appSession.role}`);
    }
  }, [appSession, authLoading, allowedRole, router]);

  return { appSession, authLoading };
}
