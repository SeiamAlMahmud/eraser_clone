import React, { useState } from 'react';
import { Archive, Flag, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SideNavBottomSectionProps {
  onFileCreate: (fileName: string) => void;
  totalFiles: number;
}

const SideNavBottomSection = ({
  onFileCreate,
  totalFiles,
}: SideNavBottomSectionProps) => {
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
  const [fileInput, setFileInput] = useState('');
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

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
            New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input
                onChange={(e) => setFileInput(e.target.value)}
                className="mt-3"
                placeholder="Enter File Name"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!(fileInput && fileInput.length > 0)}
                onClick={() => onFileCreate(fileInput)}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Progress Bar  */}

      <div className="bg-gray-200 h-4 mt-3 rounded-full mb-5">
        <div
          className="h-4 bg-blue-600 rounded-full"
          style={{ width: `${(totalFiles / 5) * 100}%` }}
        ></div>
      </div>
      <h2 className="text-[13px] mt-1 tracking-normal">
        <strong>{totalFiles}</strong> out of <strong>5</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1 tracking-tight">
        Upgrade your plan for unlimited access.
      </h2>
    </div>
  );
};

export default SideNavBottomSection;
