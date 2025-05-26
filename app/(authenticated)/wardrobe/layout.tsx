import { SidebarProvider } from "@/components/ui/sidebar";
import { WardrobeSidebar } from "@/components/wardrobe-sidebar";

export default function WardrobeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "16rem",
          } as React.CSSProperties
        }
      >
        <WardrobeSidebar className="shadow-lg rounded-2xl m-5" />
      </SidebarProvider>
      <div className="flex-1 p-8">
        <h1>Wardrobe</h1>
        {children}
      </div>
    </div>
  );
}
