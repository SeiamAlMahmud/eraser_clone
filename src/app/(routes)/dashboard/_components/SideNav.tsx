import { useMutation } from 'convex/react';
import SideNavBottomSection from './SideNavBottomSection';
import SideNavTopSection from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { api } from '../../../../../convex/_generated/api';

export interface User {
  picture: string | null;
  given_name: string | null;
  family_name: string | null;
  email: string | null;
}

const SideNav = () => {
  const { user }: { user: User | null } = useKindeBrowserClient();

  const createFile = useMutation(api.files.createFile);
  const onFileCreate = (fileName: string) => {
    console.log(fileName);
    // createFile({
    //   fileName: fileName,
    //   teamId:,
    //   createdBy: user?.email
    // })
  };

  return (
    <div className=" h-screen fixed w-64 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection user={user} />
      </div>
      <div className="mb-12">
        <SideNavBottomSection onFileCreate={onFileCreate} />
      </div>
    </div>
  );
};

export default SideNav;
