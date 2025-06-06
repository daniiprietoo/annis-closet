import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const itemsByCategory = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { category } = args;
    if (category) {
      return ctx.db
        .query("clothingItems")
        .filter(
          (q) =>
            q.eq(q.field("userId"), userId) &&
            q.eq(q.field("category"), category),
        )
        .collect();
    } else {
      return ctx.db
        .query("clothingItems")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();
    }
  },
});

export const createItem = mutation({
  args: {
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
    notes: v.optional(v.string()),
    forTrade: v.boolean(),
    imageUrl: v.id("_storage"), // storageId
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) throw new Error("User not authenticated");

    const itemId = await ctx.db.insert("clothingItems", {
      userId: userId,
      name: args.name,
      category: args.category,
      color: args.color,
      size: args.size,
      brand: args.brand,
      condition: args.condition,
      notes: args.notes,
      forTrade: args.forTrade,
      imageUrl: args.imageUrl, // storageId
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return itemId;
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getWardrobeForUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const items = await ctx.db
      .query("clothingItems")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .collect();

    return Promise.all(
      items.map(async (item) => {
        const imageUrl = item.imageUrl
          ? await ctx.storage.getUrl(item.imageUrl)
          : null;
        return { ...item, imageUrl };
      }),
    );
  },
});

export const getItemById = query({
  args: {
    itemId: v.id("clothingItems"),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const item = await ctx.db.get(args.itemId);

    if (!item) {
      return null;
    }

    if (item.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const imageUrl = item.imageUrl
      ? await ctx.storage.getUrl(item.imageUrl)
      : null;

    return { ...item, imageUrl, imageStorageId: item.imageUrl };
  },
});

export const getRelatedItems = query({
  args: {
    category: v.string(),
    excludeId: v.optional(v.id("clothingItems")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { category, excludeId, limit } = args;

    let q = ctx.db
      .query("clothingItems")
      .filter(
        (q) =>
          q.eq(q.field("userId"), userId) &&
          q.eq(q.field("category"), category),
      );

    if (excludeId) {
      q = q.filter((q) => q.neq(q.field("_id"), excludeId));
    }

    let items;
    if (limit) {
      items = await q.take(limit);
    } else {
      items = await q.collect();
    }

    return Promise.all(
      items.map(async (item) => {
        const imageUrl = item.imageUrl
          ? await ctx.storage.getUrl(item.imageUrl)
          : null;
        return { ...item, imageUrl };
      }),
    );
  },
});

export const deleteItem = mutation({
  args: {
    itemId: v.id("clothingItems"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const item = await ctx.db.get(args.itemId);

    if (!item) {
      throw new Error("Item not found");
    }

    if (item.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.itemId);
    return { success: true };
  },
});

export const updateItem = mutation({
  args: {
    itemId: v.id("clothingItems"),
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
    notes: v.optional(v.string()),
    forTrade: v.boolean(),
    imageUrl: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not authenticated");

    const item = await ctx.db.get(args.itemId);
    if (!item) throw new Error("Item not found");
    if (item.userId !== userId) throw new Error("Unauthorized");

    await ctx.db.patch(args.itemId, {
      name: args.name,
      category: args.category,
      color: args.color,
      size: args.size,
      brand: args.brand,
      condition: args.condition,
      notes: args.notes,
      forTrade: args.forTrade,
      imageUrl: args.imageUrl,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});
