import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function WantToRead({ isbn }) {
  console.log(isbn);
  const lists = [
    {
      id: 1,
      name: "Want to read",
      href: "#",
    },
    {
      id: 2,
      name: "Currently Reading",
      href: "#",
    },
    {
      id: 3,
      name: "Read",
      href: "#",
    },
  ];
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
