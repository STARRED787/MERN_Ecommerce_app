import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// CheckAuth component handles route access control based on authentication and user roles.
function CheckAuth({ isAuthenticated, user, children }) {
  // Define prop types for validation to ensure proper usage of the component.
  CheckAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired, // Indicates if the user is logged in.
    user: PropTypes.shape({
      role: PropTypes.string, // The role of the user (e.g., "admin" or "user").
    }),
    children: PropTypes.node.isRequired, // The child components (routes) to render.
  };

  // Get the current route information using `useLocation`.
  const location = useLocation();
  console.log(location.pathname);

  /**
   * Redirect unauthenticated users to the sign-in page.
   * Exception: Allow access to `/auth/signin` and `/auth/signup` routes.
   */
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/auth/signin") ||
      location.pathname.includes("/auth/signup")
    )
  ) {
    return <Navigate to="/auth/signin" replace />;
  }

  /**
   * Restrict authenticated users from accessing `/auth/signup` or `/auth/signin` routes.
   * - If the user is an admin, redirect them to the admin dashboard.
   * - If the user is not an admin, redirect them to the shop home page.
   */
  if (
    isAuthenticated &&
    (location.pathname.includes("/auth/signin") ||
      location.pathname.includes("/auth/signup"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  /**
   * Restrict access to admin pages for non-admin users.
   * - Redirect them to the unauthorized access page (`/unauth`).
   */
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth" replace />;
  }

  /**
   * Restrict access to shop pages for admin users.
   * - Redirect them back to the admin dashboard.
   */
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/unauth" replace />;
  }

  // If no conditions are triggered, render the child components (protected routes).
  return <>{children}</>;
}

export default CheckAuth;
