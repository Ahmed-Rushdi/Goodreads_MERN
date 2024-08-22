import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import useProvideData from "./ProvideData";
import { useFetchData } from "../utils/DataFetching";
import putData from "../utils/DataUpdating";

export default function WantToRead({ isbn }) {
  const { token, isLoggedIn } = useProvideData();
  const { data, loading, error } = useFetchData(
    `/api/user-book/book-shelf?isbn=${isbn}`
  );
  const [activeShelf, setActiveShelf] = useState(null);
  console.log(isbn);

  const lists = [
    { id: 1, name: "Want to read", value: "wantToRead" },
    { id: 2, name: "Currently Reading", value: "currentlyReading" },
    { id: 3, name: "Read", value: "read" },
  ];

  useEffect(() => {
    if (data && isLoggedIn) {
      setActiveShelf(data.shelfName);
    }
  }, [data, isLoggedIn]);

  const handleShelfChange = async (shelfName) => {
    if (!isLoggedIn) {
      alert("Please log in to add books to shelves.");
      return;
    }

    try {
      const url = `/api/user-book/${isbn}`;
      const data = { shelf: shelfName };

      const { resData, loading, error } = await putData(url, data);

      if (!loading && error) {
        throw new Error("Failed to update shelf");
      }

      if (resData) {
        setActiveShelf(shelfName);
      }
    } catch (error) {
      console.error("Error updating shelf:", error);
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {activeShelf
            ? lists.find((list) => list.value === activeShelf)?.name
            : "Select Shelf"}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {lists.map((list) => (
            <MenuItem key={list.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleShelfChange(list.value);
                }}
                className={`block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 ${
                  activeShelf === list.value ? "font-bold" : ""
                }`}
              >
                {list.name}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
