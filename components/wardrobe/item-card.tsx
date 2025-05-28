import { Heart, Repeat, Pencil, Star } from "lucide-react";
import Image from "next/image";
import type { ClothingItemWithUrl } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function ItemCard({ item }: { item: ClothingItemWithUrl }) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Trade badge */}
        {item.forTrade && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg">
              <Repeat className="w-3 h-3 mr-1" />
              For Trade
            </Badge>
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            aria-label="Favorite"
            className="w-9 h-9 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors shadow-lg"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            aria-label="Edit"
            className="w-9 h-9 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-colors shadow-lg"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            aria-label="Trade"
            className="w-9 h-9 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-500 transition-colors shadow-lg"
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Condition indicator */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">
              {item.condition}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 capitalize font-medium">
            {item.category}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
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
