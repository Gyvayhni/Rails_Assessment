import { router } from "@trpc/server";
import { taskRouter } from "./trpc/taskRouter"; // Import taskRouter

// Define the main appRouter that includes the taskRouter
export const appRouter = router().merge('task.', taskRouter);

// Export the type of the router for type safety
export type AppRouter = typeof appRouter;
