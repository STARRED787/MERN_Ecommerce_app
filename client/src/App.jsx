import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AdminLayout from "./components/admin/layout";
import AdminOrders from "./pages/admin/order";
import AdminProducts from "./pages/admin/products";
import Adminfetures from "./pages/admin/features";
import AdminDashboard from "./pages/admin/dashboard";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1 className="text-center">Header Component</h1>
      <Routes>
        {/* Main authentication path */}
        <Route path="/auth" element={<AuthLayout />}>
          {/* Use relative authentication paths here */}
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Main Admin path */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="fetures" element={<Adminfetures />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
