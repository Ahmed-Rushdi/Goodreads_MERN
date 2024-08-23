import { useState, useEffect } from "react";
import BaseInput from "./BaseInput";
import postData from "../../utils/DataPosting";
import putData from "../../utils/DataUpdating";
import { toast } from "react-toastify";
import BasicSpinner from "../BasicSpinner";
const AuthorForm = ({
  className,
  formTitle,
  values = {},
  updateFlag,
  setUpdateFlag,
  refreshFlagState,
}) => {
  const [formData, setFormData] = useState({});
  const [disabledFlag, setDisabledFlag] = useState(false);
  const [refreshFlag, setRefreshFlag] = refreshFlagState;

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabledFlag(true);
    const fileExt = formData.imageFile?.name.split(".").pop();
    const { data, error } = updateFlag
      ? await putData(`/api/authors/${formData._id}`, formData)
      : await postData("/api/authors", formData, {
          "x-file-type": fileExt,
        });
    if (error) toast.error(error + (data ?? ""));
    else toast.success(data);
    // * Upload image if one was selected and if the request was successful
    if (formData.imageFile && !error) {
      const { data: uploadData, error: uploadError } = postData(
        "/api/images/author",
        formData.imageFile,
        {
          "x-author-name": formData.name,
          "x-file-type": fileExt,
          "Content-Type": formData.imageFile.type,
        }
      );
      if (uploadError) toast.error(uploadError + (uploadData ?? ""));
      else toast.success(uploadData);
    }
    setUpdateFlag(false);
    setDisabledFlag(false);
    setFormData({});
    setRefreshFlag(!refreshFlag);
  };

  // * Set form values from parent (used in edit mode)
  // * scroll to top after update
  useEffect(() => {
    if (values) setFormData(values);
    window.scrollTo(0, 0);
  }, [values]);

  return (
    <form
      className={`p-5 m-4 bg-white border-buff rounded border w-full relative  ${className}`}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-buff">{formTitle}</h2>
      <hr className="border-buff" />
      <div className="flex flex-row flex-wrap">
        <BaseInput
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name ?? ""}
          onChange={handleChange}
          required
          title="Name is required"
          disabled={disabledFlag}
        />
        <BaseInput
          type="date"
          name="birthDate"
          value={
            formData.birthDate
              ? new Date(formData.birthDate).toISOString().substring(0, 10)
              : new Date().toISOString().substring(0, 10)
          }
          onChange={handleChange}
          disabled={disabledFlag}
        />
        <BaseInput
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          disabled={disabledFlag}
        />
        <BaseInput
          type="textarea"
          name="bio"
          placeholder="Biography"
          value={formData.bio ?? ""}
          onChange={handleChange}
          title="Title is required"
          disabled={disabledFlag}
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

export default AuthorForm;
