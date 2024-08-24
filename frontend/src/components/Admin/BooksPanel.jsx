import { useState } from "react";
import { fetchData, useFetchData } from "../../utils/DataFetching";
import BookForm from "./BookForm";
import BasicSpinner from "../BasicSpinner";
import BaseCard from "../Admin/BaseCard";
import { delData } from "../../utils/DataDeletion";
import { toast } from "react-toastify";
import PaginationRounded from "../BookPaging";
import { API_HOST_URL } from "../../utils/HOST";
// TODO: implement search functionality
const BooksPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [formVals, setFormVals] = useState({});
  const [formUpdateFlag, setFormUpdateFlag] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleEdit = async (dataId, setDisabled) => {
    setDisabled(true);
    const { data, error } = await fetchData(`/api/books/${dataId}`);
    setFormVals(data);
    setFormUpdateFlag(true);
    setDisabled(false);
    if (error) {
      toast.error(error + (data ?? ""));
    }
    setRefreshFlag(!refreshFlag);
  };

  const handleDelete = async (dataId, setDisabled) => {
    setDisabled(true);
    const { data, loading, error } = await delData(`/api/books/${dataId}`);
    setDisabled(loading);
    if (error) {
      toast.error(error + (data ?? ""));
    } else {
      toast.success(data);
    }
    setRefreshFlag(!refreshFlag);
  };
  const {
    data: booksPage,
    loading,
    error,
  } = useFetchData(`/api/books?page=${page}&limit=${limit}`);

  return (
    <div className="flex flex-col items-center">
      <BookForm
        formTitle="Book Information"
        values={formVals}
        updateFlag={formUpdateFlag}
        setUpdateFlag={setFormUpdateFlag}
        refreshFlagState={[refreshFlag, setRefreshFlag]}
      />
      <div className="flex flex-col items-center">
        <PaginationRounded
          totalItems={booksPage?.totalItems}
          itemsPerPage={limit}
          currentPage={page}
          onPageChange={setPage}
        />
        <p className="text-xs text-gray-500">
          Showing {page * limit - limit + 1}-
          {Math.min(page * limit, booksPage?.totalItems)} of{" "}
          {booksPage?.totalItems} total books
        </p>
      </div>
      {loading ? (
        <BasicSpinner className="mt-96" />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex flex-wrap w-full">
          {booksPage?.data.map((book) => (
            <BaseCard
              key={book.isbn13}
              dataId={book.isbn13}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            >
              <div className="w-[100px] flex-shrink-0">
                <img
                  // if image is not found, fallback to default
                  src={
                    book.thumbnail ?? `${API_HOST_URL}/fallback_thumbnail.png`
                  }
                  onError={(e) => {
                    // if src starts with our server hostname (not external image)
                    // and it returns an error (file not found) we fallback to default
                    if (e.target.src.startsWith(API_HOST_URL)) {
                      e.target.onerror = null;
                      e.target.src = `${API_HOST_URL}/fallback_thumbnail.png`;
                    } else {
                      // if src doesn't belong to our hostname (external image or relative path from the backend)
                      // and it returns an error (file not found) we append the hostname in case it is a relative path (otherwise onError will be called again and satisfy the condition above)

                      e.target.src = `${API_HOST_URL}/${book.thumbnail}`;
                    }
                  }}
                  className=""
                />
              </div>
              <div className="w-full text-xs sm:text-sm flex-shrink">
                <p className="text-buff line-clamp-1">
                  {book.title} | <i>{book.authorId.name}</i>
                </p>
                <p>{book.isbn13}</p>
                <p>
                  <span>Published: </span>
                  {" " + book.publishedDate
                    ? new Date(book.publishedDate).toLocaleDateString()
                    : ""}
                </p>
                <p className="line-clamp-3 text-gray-700 italic">
                  {book.description}
                </p>
              </div>
            </BaseCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPanel;
