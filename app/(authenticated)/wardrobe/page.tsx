import { FiltersBar } from "@/components/filters-bar";
import { ItemCard } from "@/components/item-card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export default async function WardrobePage() {
  const items = await fetchQuery(
    api.wardrobe.itemsByCategory,
    { category: "all" },
    { token: await convexAuthNextjsToken() },
  );

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mt-10 mb-6">My Wardrobe</h1>
      <FiltersBar />
      <div className="w-full max-w-6xl mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
