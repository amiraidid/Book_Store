import { Navigate } from "react-router-dom"


// eslint-disable-next-line react/prop-types
function PrivateRoute({children}) {
    const role = localStorage.getItem('role')
    if (role !== 'admin') {
        return <Navigate to="/" />
    }
    
  return children 
}

export default PrivateRoute