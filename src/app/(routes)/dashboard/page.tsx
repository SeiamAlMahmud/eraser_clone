'use client';

import { useConvex, useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const Dashboard = () => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  // const getUser = useQuery(api.user.getUser, { email: user?.email });

  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    // console.log(result, "65654");
    if (!result?.length) {
      createUser({
        name: user.given_name + ' ' + user.family_name,
        email: user.email,
        image: user.picture,
      }).then((res) => {
        // console.log(res,"res")
      });
    }
  };
  return <div>page</div>;
};

export default Dashboard;
