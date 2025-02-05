import React from 'react';
import { Archive, Flag, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SideNavBottomSection = () => {
  const menuList = [
    {
      id: 1,
      name: 'Getting Started',
      icon: Flag,
      path: '',
    },
    {
      id: 2,
      name: 'Github',
      icon: Github,
      path: '',
    },
    {
      id: 3,
      name: 'Archive',
      icon: Archive,
      path: '',
    },
  ];
  return (
    <div>
      {menuList.map((menu) => {
        return (
          <h2
            className="flex items-center gap-2 px-2 p-[6px] text-[14px] cursor-pointer rounded-md hover:bg-gray-100"
            key={menu.id}
          >
            <menu.icon className="h-5 w-5" />
            {menu.name}
          </h2>
        );
      })}
      {/* Add New File Button  */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700">New File</Button>
      {/* Progress Bar  */}

      <div className="bg-gray-200 h-4 mt-3 rounded-full mb-5">
        <div className="h-4 w-[40%] bg-blue-600 rounded-full"></div>
      </div>
      <h2  className="text-[13px] mt-1 tracking-normal">
        <strong>1</strong> out of <strong>5</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1 tracking-tight">
        Upgrade your plan for unlimited access.
      </h2>
    </div>
  );
};

export default SideNavBottomSection;
