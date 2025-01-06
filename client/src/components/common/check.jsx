import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation(); // Correct usage of `useLocation`

  // Redirect unauthenticated users to the sign-in page, except for sign-in and sign-up routes.
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/auth/signin") ||
      location.pathname.includes("/auth/signup")
    )
  ) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Redirect authenticated users away from sign-in or sign-up pages.
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

  // Restrict non-admin users from accessing admin pages.
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth" replace />;
  }

  // Restrict admin users from accessing shop pages.
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If all checks pass, render the children components.
  return <>{children}</>;
}
CheckAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

export default CheckAuth;
