'use client';

import { useConvex, useMutation } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

interface User {
  given_name: string | null;
  family_name: string | null;
  email: string | null;
  picture: string | null;
}

const Dashboard = () => {
  const convex = useConvex();
  const { user }: { user: User | null } = useKindeBrowserClient();
  // const getUser = useQuery(api.user.getUser, { email: user?.email });

  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const checkUser = async () => {
    if (!user || !user.email) return;

    const result = await convex.query(api.user.getUser, { email: user.email });
    // console.log(result, "65654");
    if (!result?.length) {
      createUser({
        name: user.given_name + ' ' + user.family_name,
        email: user.email,
        image: user.picture || '',
      }).then(() => {
        // console.log(res,"res")
      });
    }
  };
  return <div>page</div>;
};

export default Dashboard;
