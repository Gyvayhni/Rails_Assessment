// pages/_app.tsx
import "../styles/globals.css";
import { trpcClient } from "../utils/trpc"; // Make sure this path is correct
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import trpc from "../utils/trpc"; // Import trpc hooks
import { Provider } from 'jotai'; 

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <Component {...pageProps} />
      </trpc.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
