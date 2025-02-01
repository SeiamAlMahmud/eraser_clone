'use client';

import { useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const Dashboard = () => {
  const { user }: any = useKindeBrowserClient();
  const getUser = useQuery(api.user.getUser, { email: user?.email });

  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if(user){
      if (getUser == undefined) {
        createUser({
          name: user.given_name + ' ' + user.family_name,
          email: user.email,
          image: user.picture
        }).then(res => {
          console.log(res,"res")
        })
      }
      console.log(getUser)
    }
  }, [user]);
  return <div>page</div>;
};

export default Dashboard;
