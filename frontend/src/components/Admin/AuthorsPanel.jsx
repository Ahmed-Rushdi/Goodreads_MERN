import { useState } from "react";
import { fetchData, useFetchData } from "../../utils/DataFetching";
import AuthorForm from "./AuthorForm";
import BasicSpinner from "../BasicSpinner";
import BaseCard from "../Admin/BaseCard";
import { delData } from "../../utils/DataDeletion";
import { toast } from "react-toastify";
import PaginationRounded from "../BookPaging";

const handleDelete = async (dataId, setDisabled) => {
  setDisabled(true);
  const { data, loading, error } = await delData(`/api/authors/${dataId}`);
  setDisabled(loading);
  if (error) {
    toast.error(error.message + data);
  } else {
    toast.success(data);
  }
};
const AuthorsPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [formVals, setFormVals] = useState({});
  const [formUpdateFlag, setFormUpdateFlag] = useState(false);
  const handleEdit = async (dataId, setDisabled) => {
    setDisabled(true);
    const { data, error } = await fetchData(`/api/authors/${dataId}`);
    setFormVals(data);
    setFormUpdateFlag(true);
    setDisabled(false);
    if (error) {
      toast.error(error.message + data);
    }
  };

  const {
    data: authorsPage,
    loading,
    error,
  } = useFetchData(`/api/authors?page=${page}&limit=${limit}`);

  return (
    <div className="flex flex-col items-center">
      <AuthorForm
        formTitle="Author Information"
        values={formVals}
        updateFlag={formUpdateFlag}
        setUpdateFlag={setFormUpdateFlag}
      />
      <div className="flex flex-col items-center">
        <PaginationRounded
          totalItems={authorsPage?.totalItems}
          itemsPerPage={limit}
          currentPage={page}
          onPageChange={setPage}
        />
        <p className="text-xs text-gray-500">
          Showing {page * limit - limit + 1}-
          {Math.min(page * limit, authorsPage?.totalItems)} of{" "}
          {authorsPage?.totalItems} total authors
        </p>
      </div>
      {loading ? (
        <BasicSpinner className="mt-96" />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex flex-wrap w-full">
          {authorsPage?.data.map((author) => (
            <BaseCard
              key={author._id}
              dataId={author._id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            >
              <div className="w-[100px] flex-shrink-0">
                <img
                  src={
                    author.image ?? "http://localhost:3000/fallback_author.jpg"
                  }
                  className=""
                />
              </div>
              <div className="w-full text-xs sm:text-sm flex-shrink">
                <p className="text-buff line-clamp-1">{author.name}</p>
                <p>
                  <span>Born: </span>
                  {" " + author.birthDate
                    ? new Date(author.birthDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="line-clamp-3 text-gray-700 italic">
                  {author.bio ?? "Bio not available"}
                </p>
              </div>
            </BaseCard>
          ))}
        </div>
      )}
    </div>
  );
};
export default AuthorsPanel;
