import { useState } from "react";
import BasicSpinner from "../BasicSpinner";

const BaseCard = ({ children, handleEdit, dataId, handleDelete }) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="shadow-sm hover:shadow-md  p-3 h-60 flex flex-col border border-buff rounded-sm w-full m-4 sm:w-[calc(100%/2-2rem)] md:w-[calc(100%/3-2rem)] lg:w-[calc(100%/4-2rem)]">
      <div className="relative h-full flex flex-col">
        <div className="flex flex-row space-x-5">{children}</div>
        <hr className="my-3 mt-auto" />
        <div className="flex flex-row ml-2 text-buff">
          <div className="space-x-4">
            <button
              className="hover:underline"
              onClick={() => handleEdit(dataId, setDisabled)}
            >
              Edit
            </button>
            <button
              className="hover:underline"
              onClick={() => handleDelete(dataId, setDisabled)}
            >
              Delete
            </button>
          </div>
        </div>
        {disabled && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <BasicSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseCard;
