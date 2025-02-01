import Image from 'next/image';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Header from '@/app/_components/Header';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/login?');
  }

  console.log(user, 'user');
  return (
    <div>
      <Header />
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </div>
  );
};

export default page;
