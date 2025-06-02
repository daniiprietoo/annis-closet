import { ItemCard } from "@/components/wardrobe/item-card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { AddItemDialog } from "@/components/wardrobe/item-dialogs";
import type { ClothingItemWithUrl } from "@/lib/types";

export default async function WardrobePage() {
  const items = await fetchQuery(
    api.wardrobe.getWardrobeForUser,
    {},
    { token: await convexAuthNextjsToken() },
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AddItemDialog />
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                collection
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item: ClothingItemWithUrl) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Your wardrobe is empty
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Start building your digital closet by adding your first clothing item
        </p>
        <AddItemDialog />
      </div>
    </div>
  );
}
