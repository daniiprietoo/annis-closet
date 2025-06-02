import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function ItemCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200/60 dark:border-slate-700/60 overflow-hidden cursor-pointer">
      <div className="relative aspect-[4/5] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3">
          <Skeleton className="h-5 w-32 mb-1 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs font-medium">
            <Skeleton className="h-4 w-10 rounded" />
          </Badge>
          <Badge variant="secondary" className="text-xs font-medium">
            <Skeleton className="h-4 w-8 rounded" />
          </Badge>
          <Badge variant="outline" className="text-xs font-medium">
            <Skeleton className="h-4 w-12 rounded" />
          </Badge>
        </div>
      </div>
    </div>
  );
}
