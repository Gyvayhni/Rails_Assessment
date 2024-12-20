// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../backend/appRouter'; // Adjust if needed

// Create TRPC hooks for your frontend
const trpc = createTRPCReact<AppRouter>();

// Create the TRPC client instance
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc', // Backend server URL
    }),
  ],
});

export default trpc;
