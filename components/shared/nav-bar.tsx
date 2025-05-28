"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggler";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TabNavigation } from "../tab-navigation";
import Image from "next/image";

export function NavBar() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const user = useQuery(api.auth.loggedInUser);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/signin");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <nav className="border-b bg-card">
      <div className="flex flex-row h-16 items-center px-4 md:px-6 justify-between">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Image
            src="/favicon.png"
            alt="Anni's Wardrobe"
            width={32}
            height={32}
          />
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            My Wardrobe
          </div>
        </Link>
        <TabNavigation />

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="mr-2 size-4" />
              Sign out
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
