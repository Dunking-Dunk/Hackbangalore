import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Header from "@/components/landing-header";
import LandingAbstract from '../../public/icon/landingAbstract.png'

export default function Home() {

  return (
    <div className="w-full h-screen">
      <Header />
      <main className="lg:p-40 py-20 px-8 w-full flex lg:flex-row flex-col-reverse items-center justify-center">
        <div className="flex flex-col gap-6 lg:w-1/2 lg:px-10 w-full ">
          <h1 className="text-8xl font-bold">SMH</h1>
          <h3 className="text-2xl font-regular">Manage your buisness and Apply for loan <br /> at ease and quickly</h3>
          <p className="text-lg opacity-70">It takes just minutes to get started and <br /> Scale your buiness to the greatest heights</p>
          <Link href={'/sign-in'}>
            <Button className={cn('w-32 mt-12')}>Get Started</Button>
          </Link>
        </div>
        <div className="flex items-center justify-center  gap-6 lg:w-1/2 w-full">
          <Image src={LandingAbstract} alt='landing page image' className="w-full h-full" />
        </div>
      </main>
    </div>
  );
}
