import { Route, Routes } from "react-router-dom"
import { Admin, Books, Carts, CheckOut, Login, NotFound, Signup, SingleBook } from "../pages"
import ProtectedRoute from "./ProtectedRoute"
import PrivateRoute from "./PrivateRoute"

function AllRoutes () {
    return (
        <main>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Books />} />
                <Route path="/carts" element={<ProtectedRoute><Carts /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/book/:id" element={<SingleBook />} />
                <Route path="/books/checkout/:id" element={<CheckOut />} />
                <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default AllRoutes