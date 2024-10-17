import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"


// eslint-disable-next-line react/prop-types
function ProtectedRoute({children}) {
    
    const { user } = useContext(UserContext)
    

    if (user === false) {
        return <Navigate to="/login" />
    }
    
    return children
}

export default ProtectedRoute