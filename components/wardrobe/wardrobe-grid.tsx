"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ItemCard } from "@/components/wardrobe/item-card";
import { AddItemDialog } from "@/components/wardrobe/item-dialogs";
import type { ClothingItemWithUrl } from "@/lib/types";

export default function WardrobeGrid({ preloaded }: { preloaded: any }) {
  const items = useQuery(api.wardrobe.getWardrobeForUser, {}, { preloaded });

  if (items === undefined) {
    // Loading state (optional: you can add a skeleton here)
    return <div className="text-center py-16 text-slate-500">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Your wardrobe is empty
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Start building your digital closet by adding your first clothing
            item
          </p>
          <AddItemDialog />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        {items.length} {items.length === 1 ? "item" : "items"} in your
        collection
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item: ClothingItemWithUrl) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
}
