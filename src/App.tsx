import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import { MobileSideNavToggleProvider } from "./context/MobileSideNavContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <MobileSideNavToggleProvider>
                <AppLayout />
              </MobileSideNavToggleProvider>
            }></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
