import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./Context/UserContext";
import CartContextProvidor from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishlistContext";
import AppRoutes from "./routes"; // now this is a COMPONENT

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
      <CartContextProvidor>
        <WishlistContextProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </QueryClientProvider>
        </WishlistContextProvider>
      </CartContextProvidor>
      <Toaster />
    </UserContextProvider>
  );
}

export default App;
