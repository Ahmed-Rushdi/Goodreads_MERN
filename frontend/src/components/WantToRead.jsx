import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export default function WantToRead({ isbn }) {
  const [activeShelf, setActiveShelf] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const lists = [
    {
      id: 1,
      name: "Want to read",
    },
    {
      id: 2,
      name: "Currently Reading",
    },
    {
      id: 3,
      name: "Read",
    },
  ];

  useEffect(() => {
    // const jwt = Cookies.get("jwt");
    const jwt = "2";
    if (jwt) {
      setIsLoggedIn(true);
      checkCurrentShelf(jwt);
    }
  }, [isbn]);

  const checkCurrentShelf = async (jwt) => {
    try {
      const response = await fetch(`/api/book-shelf?isbn=${isbn}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const data = await response.json();
      setActiveShelf(data.shelfName);
    } catch (error) {
      console.error("Error checking current shelf:", error);
    }
  };

  const handleShelfChange = async (shelfName) => {
    if (!isLoggedIn) {
      alert("Please log in to add books to shelves.");
      return;
    }

    // const jwt = Cookies.get("jwt");
    const jwt = "2";
    try {
      const response = await fetch("/api/update-shelf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ isbn, shelfName }),
      });

      if (response.ok) {
        setActiveShelf(shelfName);
      } else {
        throw new Error("Failed to update shelf");
      }
    } catch (error) {
      console.error("Error updating shelf:", error);
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Want To Read
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
          {lists.map((list) => {
            return (
              <MenuItem key={list.id}>
                <a
                  onClick={(e) => {
                    e.preventDefault;
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  {list.name}
                </a>
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </Menu>
  );
}
