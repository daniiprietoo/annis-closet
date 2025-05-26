import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  clothingItems: defineTable({
    userId: v.id("users"),
    name: v.string(),
    category: v.union(
      v.literal("tops"),
      v.literal("bottoms"),
      v.literal("outerwear"),
      v.literal("shoes"),
      v.literal("accessories"),
      v.literal("dresses"),
      v.literal("activewear"),
    ),
    color: v.string(),
    size: v.string(),
    brand: v.optional(v.string()),
    condition: v.union(
      v.literal("new"),
      v.literal("like-new"),
      v.literal("good"),
      v.literal("fair"),
    ),
    imageUrl: v.id("_storage"),
    notes: v.optional(v.string()),
    forTrade: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("userId", ["userId"])
    .index("category", ["category"])
    .index("forTrade", ["forTrade"]),

  tradeItems: defineTable({
    fromUserId: v.id("users"),
    toUserId: v.id("users"),
    itemOfferedId: v.id("clothingItems"),
    itemRequestedId: v.id("clothingItems"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("rejected"),
      v.literal("completed"),
    ), // PENDING, ACCEPTED, REJECTED, CANCELLED
    message: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("fromUserId", ["fromUserId"])
    .index("toUserId", ["toUserId"])
    .index("status", ["status"]),

  profiles: defineTable({
    userId: v.id("users"),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    location: v.optional(v.string()),
    isAdmin: v.optional(v.boolean()),
  }).index("userId", ["userId"]),
});
