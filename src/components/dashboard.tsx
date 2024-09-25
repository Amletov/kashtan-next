"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db, isAuthorized, setIsAuthorized } from "@/config/globals";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    document.cookie = `auth-token=; Max-Age=0; path=/`;
    router.push("/auth");
  };

  return (
    <div>
      <Link
        href="/user"
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 mx-1"
      >
        {db.login} / {db.role}
      </Link>
      <Button onClick={logout}>Выход</Button>
    </div>
  );
}
