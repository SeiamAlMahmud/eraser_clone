'use client';

import { useQuery } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const Dashboard = () => {
  const { user }: any = useKindeBrowserClient();
  const getUser = useQuery(api.user.getUser, { email: user?.email });

  useEffect(() => {
    if(user){
      console.log(getUser)
    }
  }, [user]);
  return <div>page</div>;
};

export default Dashboard;
