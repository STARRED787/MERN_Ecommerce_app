import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side: Static Content (e.g., Welcome message) */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Ecommerce Webapp
          </h1>
        </div>
      </div>
      {/* Right Side: Dynamic Content (rendered based on child route) */}
      <div className="flex flex-1 items-center justify-center bg-background-primary px-4 py-12 sm:px-6 lg:px-8">
        {/* Outlet will render the nested routes like SignIn, SignUp, etc. */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
