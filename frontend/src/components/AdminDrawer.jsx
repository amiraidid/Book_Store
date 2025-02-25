import { useState } from "react";
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiChartPie, HiShoppingBag, HiUser, HiInbox, HiViewBoards } from "react-icons/hi";
import BookInfo from "./BookInfo";
import UserInfo from "./UserInfo";
import useFetch from "../hooks/useFetch";

function AdminDrawer() {

    const { listOfBooks, loading } = useFetch(`${import.meta.env.VITE_API_URL}/books`)
    const { listOfUsers } = useFetch(`${import.meta.env.VITE_API_URL}/admin/users`)

  const [selectedItem, setSelectedItem] = useState("Books");
  const renderContent = () => {
    switch (selectedItem) {
      case "Books":
        return <BookInfo listOfBooks={listOfBooks} loading={loading}/>;
      case "Users":
        return <UserInfo listOfUsers={listOfUsers} loading={loading}/>;
      case "Inbox":
        return <div>Your Inbox Content Here</div>;
      case "Upgrade":
        return <div>Your Upgrade Content Here</div>;
      case "Documentation":
        return <div>Your Documentation Content Here</div>;
      case "Help":
        return <div>Your Help Content Here</div>;
      default:
        return <div>Select an item from the sidebar</div>;
    }
  };

  return (
    <div className="flex items-start  gap-6">
        <div className="h-screen my-5">
          <Sidebar aria-label="Default sidebar example">
            <h1 className="text-3xl font-bold ml-4 my-2 text-purple-950">BOOKIA</h1>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {/* <Sidebar.Item onClick={() => setSelectedItem("Dashboard")} icon={HiChartPie}>Dashboard</Sidebar.Item> */}
                <Sidebar.Item onClick={() => setSelectedItem("Books")} icon={HiShoppingBag}>Books</Sidebar.Item>
                <Sidebar.Item onClick={() => setSelectedItem("Users")} icon={HiUser}>Users</Sidebar.Item>
                <Sidebar.Item onClick={() => setSelectedItem("Inbox")} icon={HiInbox}>Inbox</Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item onClick={() => setSelectedItem("Upgrade")} icon={HiChartPie}>Upgrade to Pro</Sidebar.Item>
                <Sidebar.Item onClick={() => setSelectedItem("Documentation")} icon={HiViewBoards}>Documentation</Sidebar.Item>
                <Sidebar.Item onClick={() => setSelectedItem("Help")} icon={BiBuoy}>Help</Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
      <div className="mt-5 flex-grow">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDrawer;
