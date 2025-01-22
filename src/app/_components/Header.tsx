import Image from "next/image";
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Header = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);
  return (
    <div>
      <header className="bg-black">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link className=" text-teal-600 flex items-center flex-nowrap gap-4" href="/">
            <Image src={"/logo.png"} width={50} height={50} alt="logo" />
            <span className=" text-white font-extrabold text-xl  hover:text-gray-500/75">Home</span>
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="text-white transition hover:text-gray-500/75" href="#"> About </a>
                </li>
                <li>
                  <a className="text-white transition hover:text-gray-500/75" href="#"> Careers </a>
                </li>
                <li>
                  <a className="text-white transition hover:text-gray-500/75" href="#"> History </a>
                </li>
                <li>
                  <a className="text-white transition hover:text-gray-500/75" href="#"> Services </a>
                </li>
                <li>
                  <a className="text-white transition hover:text-gray-500/75" href="#"> Projects </a>
                </li>
                <li>
                  <a className="text-white transition hover:text-gray-500/75" href="#"> Blog </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {user ? (
                  <LogoutLink>
                    <div className="block rounded-md bg-black-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700">
                      Logout
                    </div>
                  </LogoutLink>
                ) : (
                  <>
                    <LoginLink>
                      <div className="block rounded-md bg-black-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700">
                        Login
                      </div>
                    </LoginLink>
                    <RegisterLink>
                      <div className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-800 hover:text-white sm:block hover:border-purple-500 hover:border-[1px]">
                        Register
                      </div>
                    </RegisterLink>
                  </>
                )}
              </div>

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;