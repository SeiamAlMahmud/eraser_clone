import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useConvex } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { ChevronDown, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { Separator } from '@/components/ui/separator';
import { User } from './SideNav';

export interface TEAM {
  _id: string;
  _creationTime: string;
  createdBy: string;
  teamName: string;
}

const SideNavTopSection = ({
  user,
  activeTeamInfo,
}: {
  user: User | null;
  activeTeamInfo: (team: TEAM) => void;
}) => {
  const convex = useConvex();
  const [teamList, setTeamList] = useState<TEAM[]>([]);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  console.log(teamList, 'teamList');
  const menus = [
    {
      id: 1,
      name: 'Create Team',
      path: '/teams/create',
      icon: Users,
    },
    {
      id: 2,
      name: 'Settings',
      path: '',
      icon: Settings,
    },
  ];

  useEffect(() => {
    if (user) {
      getTeamList();
    }
  }, [user]);
  useEffect(() => {
    if (activeTeam) {
      activeTeamInfo(activeTeam);
    }
  }, [activeTeam]);
  const getTeamList = async () => {
    try {
      const result = await convex.query(api.teams.getTeam, {
        email: user?.email || '',
      });
      setTeamList(result.slice().reverse()); // make new array then reverse it
      setActiveTeam(result.slice().reverse()[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2 hover:bg-slate-200 p-1 rounded-md pl-4 cursor-pointer">
          <Image
            src={'/logo.png'}
            className="rotate-45"
            width={35}
            height={35}
            alt="logo"
          />
          <h2 className="whitespace-nowrap flex gap-1 text-[17px] font-bold">
            {activeTeam?.teamName || 'Loading...'}
            <ChevronDown />
          </h2>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-6 p-4">
        {/* Team Section  */}
        <div>
          <h3 className="text-sm font-semibold">Team Name</h3>
          {
            //  Team List
            teamList &&
              teamList.map((team) => {
                return (
                  <h3
                    key={team._id}
                    className={`text-sm font-semibold p-2 cursor-pointer hover:bg-blue-200 rounded hover:text-black ${activeTeam?._id == team?._id && 'bg-teal-200'}`}
                    onClick={() => setActiveTeam(team)}
                  >
                    {team.teamName}
                  </h3>
                );
              })
          }
        </div>
        <div>
          <Separator className="mt-2 bg-slate-200" />
          {menus.map((menu) => (
            <div key={menu.id}>
              <Link href={menu.path}>
                <h2 className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded-lg text-sm cursor-pointer">
                  <menu.icon height={20} width={20} />
                  {menu.name}
                </h2>
              </Link>
            </div>
          ))}

          <LogoutLink>
            <h2 className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded-lg text-sm cursor-pointer">
              <LogOut height={20} width={20} />
              Logout
            </h2>
          </LogoutLink>
          <Separator className="mt-2 bg-slate-200" />
          <div className="mt-3 ">
            {user && (
              <div className="flex items-center gap-3 cursor-pointer">
                <Image
                  src={user.picture || '/default-avatar.png'}
                  alt={user.given_name || 'User'}
                  height={25}
                  width={25}
                  className="bg-teal-500 rounded-full"
                />
                <div className="mt-2 flex items-start flex-col">
                  <h2 className="text-[14px] font-bold">
                    {user.given_name} {user.family_name}
                  </h2>
                  <h2 className="text-sm text-gray-400">{user.email}</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SideNavTopSection;
