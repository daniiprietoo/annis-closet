import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { AddItemDialog } from "@/components/wardrobe/item-dialogs";
import WardrobeGrid from "@/components/wardrobe/wardrobe-grid";

export default function WardrobePage() {
  const preloaded = preloadQuery(api.wardrobe.getWardrobeForUser, {});
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AddItemDialog />
              {/* Item count will be rendered in the client grid for reactivity */}
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <WardrobeGrid preloaded={preloaded} />
      </div>
    </div>
  );
}
