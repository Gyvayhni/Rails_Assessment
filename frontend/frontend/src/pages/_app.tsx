import "../styles/globals.css";
import { trpcClient } from "../utils/trpc"; // Import the client from utils
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import trpc from "../utils/trpc"; // Import trpc hooks
import { Provider as JotaiProvider } from 'jotai'; // Rename Jotai Provider

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* TRPC Provider wraps everything */}
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <JotaiProvider>
          <Component {...pageProps} />
        </JotaiProvider>
      </trpc.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
