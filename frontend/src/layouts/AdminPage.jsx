import AdminTabs from "../components/Admin/AdminTabs";
import AuthorsPanel from "../components/Admin/AuthorsPanel";
import BooksPanel from "../components/Admin/BooksPanel";
import CategoriesPanel from "../components/Admin/CategoriesPanel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchData } from "../utils/DataFetching";
import BasicSpinner from "../components/BasicSpinner";
import { Navigate } from "react-router-dom";
const items = [
  {
    key: 0,
    label: "Books",
    children: <BooksPanel />,
  },
  {
    key: 1,
    label: "Authors",
    children: <AuthorsPanel />,
  },
  {
    key: 2,
    label: "Categories",
    children: <CategoriesPanel />,
  },
  {
    key: 3,
    label: "Scrape",
    children: "Check Public Databases for ISBN and automatically add author",
  },
];

const AdminPage = () => {
  // check for admin privileges
  const { data, loading, error } = useFetchData("/api/admin");
  // while loading display basic spinner
  if (loading) {
    return (
      <div className="h-full w-full bg-white bg-opacity-50 flex items-center justify-center">
        <BasicSpinner />
      </div>
    );
  } else if (error) {
    toast.error(error.message || "An error occurred. Please try again later.");
    return <Navigate to="/" />;
  }
  toast.success(data);
  return (
    <div className="p-3">
      <AdminTabs data={items} />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AdminPage;
