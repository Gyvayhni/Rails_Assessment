import { router } from "@trpc/server";
import { taskRouter } from "./trpc/taskRouter"; // Import your taskRouter

export const appRouter = router({
  task: taskRouter, // Add taskRouter to the main router
});

export type AppRouter = typeof appRouter; // Export the AppRouter type
