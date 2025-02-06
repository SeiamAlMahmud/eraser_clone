import { useMutation } from 'convex/react';
import SideNavBottomSection from './SideNavBottomSection';
import SideNavTopSection, { TEAM } from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { api } from '../../../../../convex/_generated/api';
import { useState } from 'react';
import { toast } from 'sonner';

export interface User {
  picture: string | null;
  given_name: string | null;
  family_name: string | null;
  email: string | null;
}

const SideNav = () => {
  const { user }: { user: User | null } = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const createFile = useMutation(api.files.createFile);
  const onFileCreate = (fileName: string) => {
    console.log({
      fileName,
      teamId: activeTeam?._id || '',
      createdBy: user?.email || '',
      archive: false,
      document: '',
      whiteboard: '',
    });
    
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id || '',
      createdBy: user?.email || '',
      archive: false, 
      document: '',
      whiteboard: '',
    }).then(
      (res) => {
        if (res) {
          toast('New File has been created.');
        }
      },
      (err) => {
        toast('Error while Creating file. | ', err);
      }
    );
  };

  return (
    <div className=" h-screen fixed w-64 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          activeTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>
      <div className="mb-12">
        <SideNavBottomSection onFileCreate={onFileCreate} />
      </div>
    </div>
  );
};

export default SideNav;
