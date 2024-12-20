import { z } from "zod";
import { router, publicProcedure } from "@trpc/server";
import { prisma } from "..//prisma"; // Ensure the prisma client is imported correctly

export const taskRouter = router({
  // Fetch task lists
  getLists: publicProcedure.query(async () => {
    return await prisma.list.findMany({
      include: { tasks: true }, // Ensure `tasks` is a valid relation
    });
  }),

  // Add a new task
  addTask: publicProcedure
    .input(
      z.object({
        content: z.string(),
        listId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.task.create({
        data: {
          content: input.content,
          listId: input.listId,
        },
      });
    }),

  // Delete a task
  deleteTask: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.task.delete({
        where: {
          id: input.taskId,
        },
      });
    }),

  // Update task lists after drag-and-drop
  updateTaskList: publicProcedure
    .input(
      z.object({
        sourceList: z.object({
          id: z.string(),
          tasks: z.array(z.object({ id: z.string() })),
        }),
        destList: z.object({
          id: z.string(),
          tasks: z.array(z.object({ id: z.string() })),
        }),
      })
    )
    .mutation(async ({ input }) => {
      // Update source and destination lists in the database
      await prisma.$transaction([
        prisma.list.update({
          where: { id: input.sourceList.id },
          data: {
            tasks: {
              set: input.sourceList.tasks.map((task) => ({ id: task.id })),
            },
          },
        }),
        prisma.list.update({
          where: { id: input.destList.id },
          data: {
            tasks: {
              set: input.destList.tasks.map((task) => ({ id: task.id })),
            },
          },
        }),
      ]);

      return { success: true };
    }),
});

export type TaskRouter = typeof taskRouter;
