import { useContext } from "react";
import { EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function Settings() {
  const { toggleDarkMode, darkMode } = useContext(EntryContext) as EntryContextType;

  return (
    <div className="settings-container dark:bg-gray-800 dark:text-white bg-white text-black min-h-screen">
      <h1 className="text-center font-semibold text-2xl m-5">Settings</h1>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            if (darkMode) toggleDarkMode(); // Switch to Light Mode
          }}
          className={`${
            darkMode ? "bg-gray-500 hover:bg-gray-600 font-semibold" : "bg-blue-400 hover:bg-blue-600 font-semibold"
          } font-semibold text-white p-3 rounded-md`}
        >
          Light Mode
        </button>
        <button
          onClick={() => {
            if (!darkMode) toggleDarkMode(); // Switch to Dark Mode
          }}
          className={`${
            darkMode ? "bg-gray-500 hover:bg-gray-600 font-semibold" : "bg-blue-400 hover:bg-blue-600 font-semibold"
          } font-semibold text-white p-3 rounded-md`}
        >
          Dark Mode
        </button>
      </div>
    </div>
  );
}
