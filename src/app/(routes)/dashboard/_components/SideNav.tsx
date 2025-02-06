import SideNavBottomSection from './SideNavBottomSection';
import SideNavTopSection from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export interface User {
  picture: string | null;
  given_name: string | null;
  family_name: string | null;
  email: string | null;
}

const SideNav = () => {
  const { user }: { user: User | null } = useKindeBrowserClient();

  const onFileCreate = (fileName: string) => {
    console.log(fileName);
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
