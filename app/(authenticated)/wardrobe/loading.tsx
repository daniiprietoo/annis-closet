import { ItemCardSkeleton } from "@/components/wardrobe/item-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function WardrobeLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="text-sm text-slate-500 dark:text-slate-400">
                <Skeleton className="w-20 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ItemCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
