import AdminTabs from "../components/Admin/AdminTabs";
import AuthorsPanel from "../components/Admin/AuthorsPanel";
import BooksPanel from "../components/Admin/BooksPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const items = [
  {
    key: "0",
    label: "Books",
    className: "books-tab",
    children: <BooksPanel />,
  },
  {
    key: "1",
    label: "Authors",
    children: <AuthorsPanel />,
  },
  {
    key: "2",
    label: "Categories",
    children: "Content of Tab Pane 3",
  },
  {
    key: "3",
    label: "Scrape",
    children: "Check Public Databases for ISBN and automatically add author",
  },
];

const AdminPage = () => {
  return (
    <div className="p-3">
      <AdminTabs data={items} />
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
