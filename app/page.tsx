import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Better Auth Starter</h1>
      <p className="text-lg">
        This is a starter project for Better Auth. It is a simple project that
        uses Better Auth to authenticate users.
      </p>

      <div className="flex gap-2">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </div>
  );
}
