'use client';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import React, { useEffect, useCallback } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideNav from './_components/SideNav';

interface User {
  picture: string | null;
  given_name: string | null;
  family_name: string | null;
  email: string | null;
}

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const convex = useConvex();
  const { user }: { user: User | null } = useKindeBrowserClient();
  const router = useRouter();
  console.log(user, 'user');

  const checkTeam = useCallback(async () => {
    if (!user || !user.email) {
      router.push('/api/auth/login');
      return;
    }

    const userResult = await convex.query(api.user.getUser, {
      email: user.email,
    });
    if (!userResult?.length) {
      router.push('/api/auth/login');
      return;
    }

    const result = await convex.query(api.teams.getTeam, {
      email: user.email,
    });
    console.log(result, 'result5454');
    if (!result?.length) {
      router.push('/teams/create');
    }
  }, [convex, router, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        checkTeam();
      } else {
        router.push('/api/auth/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [checkTeam, user, router]);

  return (
    <div>
      <div className=" grid grid-cols-4">
        <div>
          <SideNav />
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
