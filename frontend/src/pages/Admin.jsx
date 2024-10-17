import { AddModel, AdminDrawer } from "../components"

function Admin() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-end my-3">
       <AddModel />
      </div>
      <AdminDrawer />
    </div>
  )
}

export default Admin