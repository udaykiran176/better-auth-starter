import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/server/users";

export default async function Home() {
  let currentUser = null;
  try {
    const userData = await getCurrentUser();
    currentUser = userData?.currentUser || null;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
  return (
    <>
      <div className="max-w-[1000px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-between p-4 gap-8 relative">
          {/* Left content */}
          <div className="flex flex-col items-center lg:items-start gap-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left">
            <span className="text-blue-500">Learn Robotics</span>
            <br />
            <span className="text-gray-900">By Doing</span>{" "}
            <span className="text-orange-500">⚡</span>
          </h1>
          <p className="text-gray-600 text-lg text-center lg:text-left">
            Learn Today Create Tomorrow
          </p>
          {currentUser ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" variant="primary">
              Continue Learning
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col max-w-[300px]">
            <Link href="/get-started" className="w-full">
              <Button size="lg" variant="primary" className="w-full">
                Get Started for free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="primaryOutline" className="w-auto px-4">
                I ALREADY HAVE AN ACCOUNT
              </Button>
            </Link>
          </div>
        )}
        </div>

        {/* Right image */}
        <div className="relative w-full max-w-[500px] h-[400px] lg:h-[450px]">
          <Image
            src="/heroimage.svg"
            fill
            alt="Children learning robotics"
            className="object-contain"
            priority
          />
        </div>
      
      </div>
    </>
  );
}
