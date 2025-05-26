import { NavBar } from "@/components/nav-bar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
