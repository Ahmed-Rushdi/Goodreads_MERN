import { useState } from "react";
import { fetchData, useFetchData } from "../../utils/DataFetching";
import BookForm from "./BookForm";
import BasicSpinner from "../BasicSpinner";
import BaseCard from "../Admin/BaseCard";
import { delData } from "../../utils/DataDeletion";
import { toast } from "react-toastify";
import PaginationRounded from "../BookPaging";
const handleDelete = async (dataId, setDisabled) => {
  setDisabled(true);
  const { data, loading, error } = await delData(`/api/books/${dataId}`);
  setDisabled(loading);
  if (error) {
    toast.error(error.message + data);
  } else {
    toast.success(data);
  }
};
// TODO: implement search functionality and fix form data setting with backend populate
const BooksPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [formVals, setFormVals] = useState({});
  const [formUpdateFlag, setFormUpdateFlag] = useState(false);
  const handleEdit = async (dataId, setDisabled) => {
    setDisabled(true);
    const { data, error } = await fetchData(`/api/books/${dataId}`);
    console.log("edit data", data);
    setFormVals(data);
    setFormUpdateFlag(true);
    setDisabled(false);
    if (error) {
      toast.error(error.message + data);
    }
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
        <div className="flex flex-wrap">
          {booksPage?.data.map((book) => (
            <BaseCard
              key={book.isbn13}
              dataId={book.isbn13}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            >
              <div className="w-[100px] flex-shrink-0">
                <img
                  src={
                    book.thumbnail == ""
                      ? "http://localhost:3000/fallback_thumbnail.png"
                      : book.thumbnail
                  }
                  onError={function () {
                    this.src = "http://localhost:3000/fallback_thumbnail.png";
                  }}
                  className=""
                />
              </div>
              <div className="w-full text-xs sm:text-sm flex-shrink">
                <p className="text-buff line-clamp-1">
                  {book.title} | <i>{book.author}</i>
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
