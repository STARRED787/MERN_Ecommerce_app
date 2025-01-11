import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/check";
import AuthLayout from "./components/auth/layout";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AdminLayout from "./components/admin/layout";
import AdminOrders from "./pages/admin/order";
import AdminProducts from "./pages/admin/products";
import AdminFeatures from "./pages/admin/features"; // Fixed typo "fetures"
import AdminDashboard from "./pages/admin/dashboard";
import ShoppingLayout from "./components/shopping/layout";
import ShoppingHome from "./pages/shopping/home";
import ShoppingListing from "./pages/shopping/listing";
import ShoppingCheckout from "./pages/shopping/checkout";
import ShoppingAccount from "./pages/shopping/account"; // Fixed typo "Acount"
import NotFound from "./pages/not found";
import UnAuth from "./pages/unauth";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Main authentication path */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Admin path */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Shopping path */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* Fallback for undefined paths */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth" element={<UnAuth />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
