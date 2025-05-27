import { Id } from "@/convex/_generated/dataModel";

export type ClothingItem = {
  _id: Id<"clothingItems">;
  _creationTime: number;
  userId: Id<"users">; // Convex id for users
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
  brand?: string;
  condition: "new" | "like-new" | "good" | "fair";
  imageUrl: Id<"_storage">; // Convex id for _storage
  notes?: string;
  forTrade: boolean;
  createdAt: number;
  updatedAt: number;
};
