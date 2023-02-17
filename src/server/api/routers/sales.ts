import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const salesRouter = createTRPCRouter({
    createSale: publicProcedure
    .input(
        z.object({
          saleReconciliationId: z.string(),
          isbn: z.string(),
          quantity: z.string(),
          price: z.string()
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
            let price = parseFloat(input.price)
            const saleRec = await ctx.prisma.saleReconciliation.findFirst({
                where:
                {
                  id: input.saleReconciliationId
                },
              })
            const book = await ctx.prisma.book.findFirst({
                where:{
                  isbn: input.isbn
                }
              })
            if (parseFloat(input.price) === 0){
              console.log("Finding Default")
              price = book.retailPrice
            }
            if (saleRec && book){
              const inventory: number = book.inventory - parseInt(input.quantity)
              if(inventory >= 0){
                await ctx.prisma.sale.create({
                    data: {
                       saleReconciliationId: input.saleReconciliationId,
                       bookId: input.isbn,
                       quantity: parseInt(input.quantity),
                       price: price,
                       subtotal: parseInt(input.quantity) * price
                    },
                });
                await ctx.prisma.book.update({
                  where: {
                    isbn: input.isbn
                  },
                  data:{
                    inventory: inventory
                  }
                })
              }
              else{
                console.log("Book inventory can't be negative")
              }
            }
            else{
                console.log("No sale reconciliation under that ID")
            }
        } catch (error) {
          console.log(error);
        }
      }),

    modifySale: publicProcedure
    .input(
      z.object({
          id: z.string(),
          saleReconciliationId: z.string(),
          isbn: z.string(),
          quantity: z.string(),
          price: z.string()
        })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const sale = await ctx.prisma.sale.findFirst({
          where:
        {
          id: input.id
        }
      });
      const book = await ctx.prisma.book.findFirst({
        where:{
          isbn: input.isbn
        }
      })
      const change: number = sale.quantity - parseInt(input.quantity)  
      if(book.inventory + change >= 0) {
        await ctx.prisma.book.update({
          where:{
            isbn: book.isbn
          },
          data:{
            inventory: book.inventory + change
          }
        })

        await ctx.prisma.sale.update({
          where:
        {
          id: input.id
      },
        data: {
          saleReconciliationId: input.saleReconciliationId,
          bookId: input.isbn,
          quantity: parseInt(input.quantity),
          price: parseFloat(input.price),
          subtotal: parseFloat(input.price) * parseInt(input.quantity)
        },
        });
      }
      else{
        console.log("This change would make the inventory negative")
      }
        
      } catch (error) {
        console.log(error);
      }
    }),

    deleteSale: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const sale = await ctx.prisma.sale.findFirst({
          where:{
            id: input.id
          }
        })
        if(sale){
          await ctx.prisma.book.update({
            where: {
              isbn: sale.bookId
            },
            data:{
              inventory: {
                increment: sale.quantity
              }
            }
          })
        }
        
        await ctx.prisma.sale.delete({
          where: {
            id: input.id
          }
        })
      } catch (error) {
        console.log(error);
      }
    })
});