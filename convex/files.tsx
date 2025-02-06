import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.optional(v.boolean()),
    document: v.optional(v.string()),
    whiteboard: v.optional(v.string()),
  },
  handler: async (ctx, args_0) => {
    const result = await ctx.db.insert('files', args_0);
    return result;
  },
});
