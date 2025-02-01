'use client';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import React, { useEffect, useCallback } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const checkTeam = useCallback(async () => {
    if (user) {
      const result = await convex.query(api.teams.getTeam, { email: user?.email });
      console.log(result, 'result5454');
      if (!result?.length) {
        router.push('/teams/create');
      }
    }
  }, [convex, router, user]);

  useEffect(() => {
    checkTeam();
  }, [checkTeam]);

  return <div>{children}</div>;
};

export default DashboardLayout;
