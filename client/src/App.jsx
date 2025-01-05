import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1 className="text-center">Header Component</h1>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          {/* Use relative paths here */}
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
