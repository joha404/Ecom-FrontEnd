import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishlistContext";
import AppRoutes from "./routes/routes";

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        {" "}
        {/* <-- Fix the name here */}
        <WishlistContextProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </QueryClientProvider>
        </WishlistContextProvider>
      </CartContextProvider>
      <Toaster />
    </UserContextProvider>
  );
}

export default App;
