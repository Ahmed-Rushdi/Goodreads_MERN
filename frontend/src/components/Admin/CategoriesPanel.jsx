import { useState } from "react";
import { fetchData, useFetchData } from "../../utils/DataFetching";
import CategoryForm from "./CategoryForm";
import BasicSpinner from "../BasicSpinner";
import BaseCard from "../Admin/BaseCard";
import { delData } from "../../utils/DataDeletion";
import { toast } from "react-toastify";
import PaginationRounded from "../BookPaging";

const handleDelete = async (dataId, setDisabled) => {
  setDisabled(true);
  const { data, loading, error } = await delData(`/api/categories/${dataId}`);
  setDisabled(loading);
  if (error) {
    toast.error(error + (data ?? ""));
  } else {
    toast.success(data);
  }
};
const CategoriesPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [formVals, setFormVals] = useState({});
  const [formUpdateFlag, setFormUpdateFlag] = useState(false);
  const handleEdit = async (dataId, setDisabled) => {
    setDisabled(true);
    const { data, error } = await fetchData(`/api/categories/${dataId}`);
    setFormVals(data);
    setFormUpdateFlag(true);
    setDisabled(false);
    if (error) {
      toast.error(error + (data ?? ""));
    }
  };

  const {
    data: categoriesPage,
    loading,
    error,
  } = useFetchData(`/api/categories?page=${page}&limit=${limit}`);

  return (
    <div className="flex flex-col items-center">
      <CategoryForm
        formTitle="Category Information"
        values={formVals}
        updateFlag={formUpdateFlag}
        setUpdateFlag={setFormUpdateFlag}
      />
      <div className="flex flex-col items-center">
        <PaginationRounded
          totalItems={categoriesPage?.totalItems}
          itemsPerPage={limit}
          currentPage={page}
          onPageChange={setPage}
        />
        <p className="text-xs text-gray-500">
          Showing {page * limit - limit + 1}-
          {Math.min(page * limit, categoriesPage?.totalItems)} of{" "}
          {categoriesPage?.totalItems} total categories
        </p>
      </div>
      {loading ? (
        <BasicSpinner className="mt-96" />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex flex-wrap w-full">
          {categoriesPage?.data.map((category) => (
            <BaseCard
              key={category._id}
              dataId={category._id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            >
              <div className="w-full text-xs sm:text-sm flex-shrink">
                <p className="text-buff line-clamp-1">{category.name}</p>
                <p className="line-clamp-3 text-gray-700 italic">
                  {category.description ?? "Description not available"}
                </p>
              </div>
            </BaseCard>
          ))}
        </div>
      )}
    </div>
  );
};
export default CategoriesPanel;
