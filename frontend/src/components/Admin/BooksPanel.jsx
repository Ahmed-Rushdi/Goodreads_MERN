import { useState } from "react";
import { fetchData, useFetchData } from "../../utils/DataFetching";
import BookForm from "./BookForm";
import BasicSpinner from "../BasicSpinner";
import BaseCard from "../Admin/BaseCard";
import { delData } from "../../utils/DataDeletion";
import { toast } from "react-toastify";

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
const BooksPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [formVals, setFormVals] = useState({});
  const [formUpdateFlag, setFormUpdateFlag] = useState(false);
  const handleEdit = async (dataId, setDisabled) => {
    setDisabled(true);
    const { data, error } = await fetchData(`/api/books/${dataId}`);
    console.log(data);
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
    <div>
      <BookForm
        formTitle="Book Information"
        values={formVals}
        updateFlag={formUpdateFlag}
        setUpdateFlag={setFormUpdateFlag}
      />
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
              <div className="w-[100px] ">
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
              <div className="w-full">
                <p className="text-buff truncate">
                  {book.title} | <i>{book.author}</i>
                </p>
                <p>
                  {book.isbn13} | Published:
                  {" " + book.publishedDate
                    ? new Date(book.publishedDate).toLocaleDateString()
                    : ""}
                </p>
                <p className="line-clamp-3">{book.description}</p>
              </div>
            </BaseCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPanel;
