import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import { MobileSideNavToggleProvider } from "./context/MobileSideNavContext";
import { Provider } from "react-redux";
import store from "./store/store";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

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
            element={
              <Provider store={store}>
                <MobileSideNavToggleProvider>
                  <AppLayout />
                </MobileSideNavToggleProvider>
              </Provider>
            }>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
