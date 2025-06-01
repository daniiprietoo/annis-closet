import { Repeat, Star } from "lucide-react";
import Image from "next/image";
import type { ClothingItemWithUrl } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function ItemCard({ item }: { item: ClothingItemWithUrl }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
      <div className="relative aspect-[4/5] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {item.forTrade && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg">
              <Repeat className="w-3 h-3 mr-1" />
              For Trade
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">
              {item.condition}
            </span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 capitalize font-medium">
            {item.category}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs font-medium">
            {item.color}
          </Badge>
          <Badge variant="secondary" className="text-xs font-medium">
            {item.size}
          </Badge>
          {item.brand && (
            <Badge variant="outline" className="text-xs font-medium">
              {item.brand}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
