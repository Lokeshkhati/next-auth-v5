import RenderUsers from "@/components/ui/RenderUsers";
import LogoutButton from "@/components/auth/LogoutButton";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { convertToTitleCase } from "@/utils";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import Logo from "@/components/Logo";

export default async function Home() {
  const session = await auth()
  console.log(session, 'this is session')

  if (!session) {
    redirect('/login')
    location.reload()
  }
  return (
    <Suspense fallback={<Loading />}>
      <section className="">
        <nav className="px-4 flex gap-4 items-center h-[4rem] bg-[#ededed] justify-between">
          <div className='flex justify-between items-center gap-10 '>
            <Logo />
            <ul className='flex justify-between items-center gap-10 '>
              <Link href='/dashboard'>Dashboard</Link>
              <Link href='/profile'>Profile</Link>
            </ul>
          </div>
          <div className="flex items-center gap-4  justify-between">
            <h2 className="font-bold text-lg">Welcome  {convertToTitleCase(session?.user?.name)}!</h2>
            {
              session?.user ? <LogoutButton /> : <Link href='/login'>Login</Link>
            }

          </div>
        </nav>
        <div className="my-4">
          <RenderUsers />
        </div>
      </section >
    </Suspense >
  );
}


