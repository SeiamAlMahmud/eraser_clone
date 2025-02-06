import { Search, Send } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { User } from './SideNav';
import { Button } from '@/components/ui/button';

const Header = ({ user }: { user: User | null }) => {
  return (
    <div className="flex justify-end gap-2 w-full items-center">
      <div className="flex gap-2 items-center border rounded-md p-1">
        <Search className="h-4 w-4" />
        <input type="text" placeholder="Search" />
      </div>
      {user && (
        <div>
          <Image
            src={user?.picture || ''}
            alt={user?.given_name || 'user'}
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      )}
      <Button className="flex gap-2 h-8  hover:bg-blue-600 bg-teal-600">
        <Send className="h-4 w-4" /> Invite
      </Button>
    </div>
  );
};

export default Header;
