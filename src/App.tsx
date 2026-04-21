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
import QueryWithReauthProvider from "./context/QueryWithReauthContext";
import Users from "./pages/Users";

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
                <QueryWithReauthProvider>
                  <MobileSideNavToggleProvider>
                    <AppLayout />
                  </MobileSideNavToggleProvider>
                </QueryWithReauthProvider>
              </Provider>
            }>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
