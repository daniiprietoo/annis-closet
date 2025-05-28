import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const ensureProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const userId  = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const existing = await ctx.db.query('profiles').withIndex('userId', q => q.eq('userId', userId)).collect()
    
    if (existing) return existing;

    const profile = await ctx.db.insert("profiles", {
      userId,
      displayName: "", // or whatever field you want
      bio: "",
      location: "",
      isAdmin: false,
    });

    return ctx.db.get(profile);
  },
});
