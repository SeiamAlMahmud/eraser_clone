import { ChevronDown, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { Separator } from '@/components/ui/separator';

const SideNavTopSection = ({ user }) => {
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
            Team Name
            <ChevronDown />
          </h2>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-6 p-4">
        {/* Team Section  */}
        <div>
          <h3 className="text-sm font-semibold">Team Name</h3>
        </div>
        <div>
          <Separator className="mt-2 bg-slate-200" />
          {menus.map((menu) => (
            <div key={menu.id}>
              <h2 className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded-lg text-sm cursor-pointer">
                <menu.icon height={20} width={20} />
                {menu.name}
              </h2>
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
                  src={user?.picture}
                  alt={user?.given_name}
                  height={25}
                  width={25}
                  className="bg-teal-500 rounded-full"
                />
                <div className="mt-2 flex items-start flex-col">
                  <h2 className="text-[14px] font-bold">
                    {user?.given_name} {user?.family_name}
                  </h2>
                  <h2 className="text-sm text-gray-400">{user?.email}</h2>
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
