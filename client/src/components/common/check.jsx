import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CheckAuth({ isAuthenticated, user, children }) {
  CheckAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      role: PropTypes.string, // The role of the user (e.g., "admin" or "user").
    }),
    children: PropTypes.node.isRequired,
  };

  const location = useLocation();
  console.log(location.pathname);

  // Redirect unauthenticated users to the sign-in page
  if (
    !isAuthenticated &&
    !["/auth/signin", "/auth/signup"].includes(location.pathname)
  ) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Prevent authenticated users from accessing sign-in or sign-up pages
  if (
    isAuthenticated &&
    ["/auth/signin", "/auth/signup"].includes(location.pathname)
  ) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/shop/home" replace />
    );
  }

  // Restrict access to admin pages for non-admin users
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth" replace />;
  }

  // Restrict access to shop pages for admin users
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/shop")
  ) {
    return <Navigate to="/unauth" replace />;
  }

  // Render the child components if no redirection conditions are met
  return <>{children}</>;
}

export default CheckAuth;
