"use client";

import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggler";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TabNavigation } from "../tab-navigation";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

export function NavBar() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const user = useQuery(api.auth.loggedInUser);
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/signin");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <nav className="bg-card shadow-md border-b">
      <div className="flex flex-row h-16 items-center px-4 sm:px-6 max-w-7xl mx-auto justify-between">
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
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row items-center gap-6">
          <TabNavigation />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Desktop Sign Out/Login */}
          <div className="hidden md:block">
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
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle className="hidden" >
                    <div className="flex items-center gap-2 font-medium">
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                        My Wardrobe
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 px-4">
                  <TabNavigation direction="column" />
                  {user ? (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setOpen(false);
                        handleSignOut();
                      }}
                      className="text-muted-foreground hover:text-foreground w-full justify-start mb-4"
                    >
                      <LogOut className="mr-2 size-4" />
                      Sign out
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setOpen(false);
                        router.push("/login");
                      }}
                      className="w-full justify-start text-lg mb-4"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
