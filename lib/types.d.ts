import type { Doc } from "@/convex/_generated/dataModel";

export type ClothingItem = Doc<"clothingItems">;
export type TradeItem = Doc<"tradeItems">;
export type Profile = Doc<"profiles">;

export type ClothingItemWithUrl = {
  _id: Id<"clothingItems">;
  _creationTime: number;
  brand?: string | undefined;
  notes?: string | undefined;
  userId: Id<"users">;
  name: string;
  category:
    | "tops"
    | "bottoms"
    | "outerwear"
    | "shoes"
    | "accessories"
    | "dresses"
    | "activewear";
  color: string;
  size: string;
  condition: "new" | "like-new" | "good" | "fair";
  imageUrl: string | null;
  forTrade: boolean;
  createdAt: number;
  updatedAt: number;
};
