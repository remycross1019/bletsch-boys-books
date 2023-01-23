import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  createAdminPassword: publicProcedure
    .input(
      z.object({
        id: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.admin.create({
          data: {
            id: input.id,
            password: input.password,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
    getPassword: publicProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.prisma.admin.findFirst({
          select: {
            id: true,
            password: true,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
    // changePassword: protectedProcedure
    // .query(async ({ ctx }) => {
    //   try {
    //     return await ctx.prisma.admin.update({
    //       select: {

    //       }
    //     });
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // }),
});