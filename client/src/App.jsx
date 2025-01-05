import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1 className="text-center">Header Component</h1>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
