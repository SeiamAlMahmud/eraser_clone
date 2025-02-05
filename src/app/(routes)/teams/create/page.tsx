'use client';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Boxes } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';

interface User {
  email: string | null;
}

const CreateTeam = () => {
  const { user }: { user: User | null } = useKindeBrowserClient();
  const router = useRouter();
  const convex = useConvex();
  const [teamName, setTeamName] = useState('');

  const createTeam = useMutation(api.teams.createTeam);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        router.push('/api/auth/login?redirect=/teams/create');
      } 
    }, 2000);
    return () => clearTimeout(timer);
  }, [user, router]);

  const createNewTeam = async () => {
    if (!user || !user.email) {
      router.push('/api/auth/login');
      return;
    }

    const result = await convex.query(api.user.getUser, { email: user.email });
    if (!result?.length) {
      router.push('/api/auth/login');
      return;
    }

    createTeam({
      teamName: teamName,
      createdBy: user.email,
    }).then(() => {
      toast('Team created successfully');
      router.push('/dashboard');
    });
  };



  return (
    <div className="px-6 lg:px-14 my-14">
      <div className=" flex justify-center items-center">
        <h1 className="text-center p-1 px-2 text-sm rounded-lg bg-green-300 flex gap-2 justify-center items-center font-semibold whitespace-nowrap">
          <Boxes size={17} />
          Team Name
        </h1>
      </div>
      <div className="mt-8">
        <h2 className="text-center text-3xl sm:text-5xl font-bold ">
          What should we call your team?
        </h2>
        <h2 className="text-center mt-5 text-lg">
          You can always change this later from settings
        </h2>
      </div>
      <div className="flex flex-col mt-8 w-[80%] sm:w-[50%] lg:w-[40%] md:w-[35%] mx-auto">
        <label className="mb-2 font-bold ml-[2px]">Team Name</label>
        <Input
          type="text"
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
          className="p-1"
        />
        <Button
          disabled={!(teamName && teamName?.length > 0)}
          className="mt-4 bg-blue-500"
          onClick={createNewTeam}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
