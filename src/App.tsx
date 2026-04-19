import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import { MobileSideNavToggleProvider } from "./context/MobileSideNavContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import store from "./store/store";

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
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
