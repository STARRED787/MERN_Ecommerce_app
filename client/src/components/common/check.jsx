import { useLocation } from "react-router-dom"

function CheckAuth(isAuthenticated, user, children) {
    const location = useLocation

    if (!isAuthenticated && 
        !(location.pathname.includes('/signin'))
        || !(location.pathname.includes('/sigup'))
    ) {
        
    }
  return (
 
  )
}

export default CheckAuth
