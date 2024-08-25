import { useEffect, useState } from "react";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaUserCircle } from "react-icons/fa";
import useProvideData from "./ProvideData";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./Search/SearchBar";
import { useNavigate } from "react-router-dom";
import postData from "../utils/DataPosting";
import MobileSearchBar from "./Search/MobileSearchBar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, isLoggedIn, isLoading } = useProvideData();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 775);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = async () => {
    const { resData, error } = await postData("/api/logout", {
      email: user.email,
    });

    if (error) {
      console.error("Failed to logout:", error.message);
      return;
    }

    if (resData) {
      console.log("Logged out successfully:", resData);
      navigate("/login");
    }
  };

  useEffect(() => {
    // This will trigger a re-render when `isLoggedIn` changes
  }, [isLoggedIn]);

  if (isLoading) {
    return null; // Or a loading spinner, depending on your design
  }
  const navigation = [
    { name: "Home", href: "/", current: true },
    {
      name: "My Books",
      href: `${isLoggedIn ? "/profile" : "/login"}`,
      current: false,
    },
    { name: "Browse", href: "/trending-categories", current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-olive-green sticky z-10 top-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-open:block"
              />
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-active-nav text-white"
                        : "text-gray-300 hover:bg-hover-nav hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="navbar-search">
            {" "}
            {isMobile ? <MobileSearchBar /> : <SearchBar />}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <Link to={isLoggedIn ? "/profile" : "/login"}>
                  <MenuButton className="relative flex items-center text-sm text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <FaUserCircle className="h-8 w-8" aria-hidden="true" />
                    <span className="ml-2">
                      {isLoggedIn ? "Profile" : "Log in"}
                    </span>
                  </MenuButton>
                </Link>
              </div>
              {isLoggedIn && (
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  {user.role === "admin" && (
                    <MenuItem>
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </Menu.Items>
              )}
            </Menu>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={
                location.pathname === item.href ? "page" : undefined
              }
              className={classNames(
                location.pathname === item.href
                  ? "bg-active-nav text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
