import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext";


function Header() {

    const [showMenu, setShowMenu] = useState(localStorage.getItem('show-menu') || false)
    const { user } = useContext(UserContext)


    const showMenuBar = () => {
        localStorage.setItem('show-menu', showMenu)
        setShowMenu(!showMenu)
    }

    function handleLogout () {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        window.location.reload()
    }

    return (
        <header className="container mx-auto">
            <nav className="flex justify-between items-center mx-auto p-4 bg-[#fffdf6]">

                <Link to="/" className="flex items-center">
                    <i className="bi bi-book-half text-3xl"></i>
                    <span className="text-center text-3xl mt-1 font-semibold whitespace-nowrap dark:text-white">Bookia</span>
                </Link>

                {/* Desktop screen */}
                <div className="flex justify-center items-center gap-4 w-72 h-14 max-sm:hidden">
                    <Link to={"/carts"} className="text-xl text-gray-900 font-medium cursor-pointer">🛒</Link>  
                    {
                        user ?  
                        <button onClick={handleLogout} className="bg-[#3b0944] text-white font-medium border-2 py-1 px-4 rounded-md shadow-inner  hover:px-5 transition-all">Logout</button>
                        : 
                        <>
                            <Link to={'/login'}><button className="bg-[#3b0944] text-white py-1 px-4 rounded-md shadow-lg  hover:px-5 transition-all">Login</button></Link>
                            <Link to={'/signup'}><button className="bg-[#fdf2f2] text-black font-medium border-2 py-1 px-4 rounded-md shadow-inner  hover:px-5 transition-all">Get Start</button></Link>
                        </>

                    }
                </div>

                {/* Mobile Screen */}
                <button onClick={showMenuBar} className="lg-hidden md:hidden"><i className="bi bi-list text-4xl cursor-pointer"></i></button>
                <div className={`lg:hidden md:hidden ${showMenu ? 'flex' : 'hidden'} flex-col transition-all gap-10 rounded-lg bg-[#2c365d] p-7 absolute z-10 top-20 right-0 mr-4`}>
                    <ul className="flex flex-col w-full items-center gap-5 uppercase">
                        <Link to={"/"}><li className="text-xl text-gray-100 cursor-pointer">Books</li></Link>
                    </ul>

                    <div className="flex flex-col justify-center items-center gap-4 w-52 h-14">
                        <Link to={"/carts"} className="text-xl text-gray-900 font-medium cursor-pointer">🛒</Link>  
                        {
                            user ?  
                            <button onClick={handleLogout} className="bg-[#3b0944] text-white font-medium border-2 py-1 px-4 rounded-md shadow-inner  hover:px-5 transition-all">Logout</button>
                            : 
                            <>
                                <Link to={'/login'}><button className="bg-[#3b0944] text-white py-1 px-4 rounded-md shadow-lg  hover:px-5 transition-all">Login</button></Link>
                                <Link to={'/signup'}><button className="bg-[#fdf2f2] text-black font-medium border-2 py-1 px-4 rounded-md shadow-inner  hover:px-5 transition-all">Get Start</button></Link>
                            </>

                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header