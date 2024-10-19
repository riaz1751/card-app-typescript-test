import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), schedule_at: new Date() };
  const { saveEntry, darkMode } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  return (
    <section
      className={`flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 p-8 rounded-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
      }`}
    >
      <input
        className={`p-3 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className={`p-3 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <label className="font-semibold mt-2 mb-1" htmlFor="created_at">
        Created at
      </label>
      <input
        className={`p-3 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <label className="font-semibold mt-2 mb-1" htmlFor="schedule_at">
        Schedule at
      </label>
      <input
        className={`p-3 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        type="date"
        name="schedule_at"
        value={new Date(newEntry.schedule_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className={`font-semibold p-3 rounded-md ${
          darkMode ? "bg-gray-500 hover:bg-gray-600 font-semibold" : "bg-blue-400 hover:bg-blue-600 text-white"
        }`}
      >
        Create
      </button>
    </section>
  );
}
