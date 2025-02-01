import { v } from 'convex/values';
import { query } from './_generated/server';

export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args_0) => {
    const result = await ctx.db
      .query('user')
      .filter((q) => q.eq(q.field('email'), args_0.email))
      .collect();

    return result;
  },
});
