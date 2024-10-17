import { useEffect, useState } from 'react'
import { Header } from './components'
import { UserContext } from './context/UserContext'
import AllRoutes from './routes/AllRoutes'

function App() {

  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('token') !== null) {
      setUser(true)
    }
    setLoading(false)
  }, [])

  if (loading) return

  return (
    <div className="">
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <AllRoutes />
      </UserContext.Provider>
    </div>
  )
}

export default App
