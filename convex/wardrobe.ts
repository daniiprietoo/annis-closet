import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server"
import { v } from "convex/values"

export const itemsByCategory = query({
  args: {
    category: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    
    if (!userId) {
      throw new Error("Unauthorized");
    }
    
    const { category } = args;
    if (category) {
      return ctx.db.query("clothingItems").filter((q) => q.eq(q.field("userId"), userId) && q.eq(q.field("category"), category)).collect();
    } else {
      return ctx.db.query("clothingItems").filter((q) => q.eq(q.field("userId"), userId)).collect();
    }
  }
})
