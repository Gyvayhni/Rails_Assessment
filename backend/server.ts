import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend
app.use(express.json()); // Parse JSON requests

// Initialize tRPC
const createContext = () => ({ prisma });
type Context = ReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

// Define tRPC router
const router = t.router({
  getLists: t.procedure.query(async ({ ctx }) => {
    console.log("Fetching lists...");
    return await ctx.prisma.list.findMany({
      include: { tasks: true },
    });
  }),
  addList: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log("Adding a list with name:", input.name);
      return await ctx.prisma.list.create({
        data: { name: input.name },
      });
    }),
  addTask: t.procedure
    .input(z.object({ content: z.string(), listId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      console.log("Adding a task to list ID:", input.listId);
      return await ctx.prisma.task.create({
        data: { content: input.content, listId: input.listId },
      });
    }),
});

// Setup tRPC middleware
app.use('/trpc', trpcExpress.createExpressMiddleware({ router, createContext }));

// Centralized error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
