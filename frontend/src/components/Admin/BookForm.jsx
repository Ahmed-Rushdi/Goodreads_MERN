import { useState, useEffect } from "react";
import BaseInput from "./BaseInput";
import postData from "../../utils/DataPosting";
import putData from "../../utils/DataUpdating";
import { toast } from "react-toastify";
import BasicSpinner from "../BasicSpinner";
import { useFetchData } from "../../utils/DataFetching";
const BookForm = ({
  className,
  formTitle,
  values = {},
  updateFlag,
  setUpdateFlag,
}) => {
  const [formData, setFormData] = useState({});
  const [disabledFlag, setDisabledFlag] = useState(false);
  const { data: categories } = useFetchData("/api/categories");
  const { data: authors } = useFetchData("/api/authors");
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setDisabledFlag(true);
    const formAuthor = formData.author?.trim();
    const authorId = authors?.data.find((a) => a.name === formAuthor)?._id;
    if (!authorId) {
      toast.error("Author does not exist in database. Please add it first.");
      setDisabledFlag(false);
      return;
    }
    setFormData({
      ...formData,
      authorId: authorId,
    });
    const { data, error } = updateFlag
      ? await putData(`/api/books/${formData._id}`, formData)
      : await postData("/api/books", formData);
    setUpdateFlag(false);
    setDisabledFlag(false);
    if (error) {
      toast.error(error + (data ?? ""));
    } else {
      toast.success(data);
    }
    setFormData({});
  };

  const handleAddCategory = () => {
    const catField = formData.category?.trim();
    if (!catField) return;

    if (formData.categories?.includes(catField)) {
      toast.error("Category already exists");
      return;
    }
    const catId = categories?.find(
      (category) => category.name === catField
    )?._id;

    if (!catId) {
      toast.error("Category does not exist in database. Please add it first.");
    }

    setFormData({
      ...formData,
      categories: [...(formData.categories ?? []), catField],
      category: "",
    });
  };

  const handleRemoveCategory = (index) =>
    setFormData({
      ...formData,
      categories: formData.categories.filter((_, i) => i !== index),
    });

  // * Set form values from parent (used in edit mode)
  // * scroll to top after update
  useEffect(() => {
    if (values) setFormData(values);
    window.scrollTo(0, 0);
  }, [values]);

  return (
    <form
      className={`p-5 m-4 bg-white border-buff rounded border w-full ${className}`}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-buff">{formTitle}</h2>
      <hr className="border-buff" />
      <div className="flex flex-row flex-wrap">
        <BaseInput
          type="text"
          name="isbn13"
          placeholder="ISBN13"
          value={formData.isbn13 ?? ""}
          onChange={handleChange}
          required
          title="ISBN13 is required and must be 12 digits + 1 digit or the character X"
          pattern={"^[0-9]{12}[0-9X]$"}
          disabled={disabledFlag}
        />
        <BaseInput
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title ?? ""}
          onChange={handleChange}
          required
          title="Title is required"
          disabled={disabledFlag}
        />
        <BaseInput
          type="text"
          name="author"
          placeholder="Author"
          value={formData.authorId?.name ?? ""}
          listOptions={authors?.data}
          onChange={handleChange}
          title="Author is required"
          required
          disabled={disabledFlag}
        />
        <BaseInput
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={formData.publisher ?? ""}
          onChange={handleChange}
          disabled={disabledFlag}
        />
        <BaseInput
          type="date"
          name="publishedDate"
          value={
            formData.publishedDate
              ? new Date(formData.publishedDate).toISOString().substring(0, 10)
              : new Date().toISOString().substring(0, 10)
          }
          onChange={handleChange}
          disabled={disabledFlag}
        />
        <BaseInput
          type="number"
          name="pageCount"
          value={formData.pageCount ?? ""}
          onChange={handleChange}
          disabled={disabledFlag}
        />

        <BaseInput
          type="text"
          name="language"
          value={formData.language ?? ""}
          onChange={handleChange}
          pattern={"^([a-zA-Z0-9]+,?)*$"}
          disabled={disabledFlag}
        />
        <BaseInput
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleChange}
          disabled={disabledFlag}
        />
        <BaseInput
          type="tags"
          name="category"
          value={formData.category ?? ""}
          mulValues={formData.categories ?? []}
          onChange={handleChange}
          addCategory={handleAddCategory}
          removeCategory={handleRemoveCategory}
          listOptions={categories?.data}
          disabled={disabledFlag}
          containerClass={"flex-grow-0"}
        />
        <BaseInput
          type="textarea"
          name="description"
          placeholder="Description"
          value={formData.description ?? ""}
          onChange={handleChange}
          title="Title is required"
          disabled={disabledFlag}
          className={"h-24"}
        />
      </div>
      <br />
      <div className="flex justify-end">
        <button
          className="bg-beige hover:bg-beige/50 font-medium py-2 px-4 rounded mr-4"
          onClick={() => {
            setFormData({});
            setUpdateFlag(false);
          }}
        >
          Reset
        </button>
        <button
          className="bg-beige hover:bg-beige/50 font-medium py-2 px-4 rounded"
          // className="text-buff hover:underline font-medium"
          type="submit"
        >
          Save
        </button>
      </div>
      {disabledFlag && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <BasicSpinner />
        </div>
      )}
    </form>
  );
};

export default BookForm;
