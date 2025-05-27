import type { ClothingItem } from "@/lib/types";
import Image from "next/image";

export function ItemCard({ item }: { item: ClothingItem }) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4 flex flex-col items-center">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={100}
        height={100}
        className="w-32 h-32 object-cover rounded-lg mb-2"
      />
      <div className="font-semibold">{item.name}</div>
      <div className="text-sm text-gray-500">{item.category}</div>
      {/* Add more item details as needed */}
    </div>
  );
}
