import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NavBar() {
  const { darkMode } = useContext(EntryContext) as EntryContextType;

  return (
    <nav className={`flex justify-center gap-5 p-4 ${darkMode ? "bg-gray-900" : "bg-white"} dark:bg-gray-900`}>
      <NavLink
        className={`m-3 p-4 text-xl ${
          darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-400 hover:bg-blue-500"
        } rounded-md font-medium text-white`}
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className={`m-3 p-4 text-xl ${
          darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-400 hover:bg-blue-500"
        } rounded-md font-medium text-white`}
        to={"/create"}
      >
        New Entry
      </NavLink>
      <NavLink
        className={`m-3 p-4 text-xl ${
          darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-400 hover:bg-blue-500"
        } rounded-md font-medium text-white`}
        to={"/settings"}
      >
        Settings
      </NavLink>
    </nav>
  );
}
