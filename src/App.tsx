import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";
import router from "./router/router";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          richColors
          theme="light"
          expand={true}
          closeButton
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
