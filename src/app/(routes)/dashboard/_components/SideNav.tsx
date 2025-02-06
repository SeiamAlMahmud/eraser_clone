import { useConvex, useMutation } from 'convex/react';
import SideNavBottomSection from './SideNavBottomSection';
import SideNavTopSection, { TEAM } from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { api } from '../../../../../convex/_generated/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useFileList } from '@/app/_context/FileListContext';

export interface User {
  picture: string | null;
  given_name: string | null;
  family_name: string | null;
  email: string | null;
}

const SideNav = () => {
  const { user }: { user: User | null } = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex();
  const { setFileList_} = useFileList();

  useEffect(() => {
    if (activeTeam) {
      getFiles();
    }
  }, [activeTeam]);
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
          getFiles();
          toast('New File has been created.');
        }
      },
      (err) => {
        toast('Error while Creating file. | ', err);
      }
    );
  };

  const getFiles = async () => {
    try {
      const result = await convex.query(api.files.getFiles, {
        teamId: activeTeam?._id || '',
      });
      console.log(result, 'files');
      setFileList_(result)
      setTotalFiles(result?.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-screen fixed w-72 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          activeTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>
      <div className="mb-12">
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
};

export default SideNav;
