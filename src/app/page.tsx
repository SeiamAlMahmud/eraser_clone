import Header from "./_components/Header";
import Hero from "./_components/Hero";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  
  console.log(user);

  return (
    <div>
     <Header />
     <Hero />
    </div>
  );
}
