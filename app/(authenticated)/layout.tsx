import { NavBar } from "@/components/shared/nav-bar";
import { ProfileInitializer } from "@/components/shared/profile-initializer";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      <ProfileInitializer />
    </div>
  );
}
