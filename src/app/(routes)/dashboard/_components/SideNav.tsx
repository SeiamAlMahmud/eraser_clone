import SideNavTopSection from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

interface User {
  picture: string | null;
  given_name: string | null;
  family_name: string | null;
  email: string | null;
}

const SideNav = () => {
  const { user }: { user: User | null } = useKindeBrowserClient();
  return (
    <div className="bg-gray-100 h-screen fixed w-64 border-r p-6">
      <SideNavTopSection user={user} />
    </div>
  );
};

export default SideNav;
