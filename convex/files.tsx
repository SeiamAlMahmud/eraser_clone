import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.optional(v.boolean()),
    document: v.optional(v.any()),
    whiteboard: v.optional(v.string()),
  },
  handler: async (ctx, args_0) => {
    const result = await ctx.db.insert('files', args_0);
    return result;
  },
});

export const getFiles = query({
  args: {
    teamId: v.string(),
    // archived: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query('files')
      .filter((q) => q.eq(q.field('teamId'), args.teamId))
      .order('desc')
      .collect();
    return result;
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id('files'),
    document: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      document: args.document,
    });
    return result;
  },
});


export const getFileById = query({
  args: {
    _id: v.id('files'),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});
