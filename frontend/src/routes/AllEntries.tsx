import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry, darkMode } = useContext(EntryContext) as EntryContextType;
  let navigate = useNavigate();
  if (entries.length == 0) {
    return (
      <section>
        <h1 className="text-center font-semibold text-2xl m-5">You don't have any card</h1>
        <p className="text-center font-medium text-md">
          Lets{" "}
          <Link className="text-blue-400 underline underline-offset-1" to="/create">
            Create One
          </Link>
        </p>
      </section>
    );
  }
  return (
    <section className={`${darkMode ? "bg-gray-700" : "bg-white"} grid grid-cols-2 md:grid-cols-4`}>
      {entries.map((entry: Entry, index: number) => {
        return (
          <div
            id={entry.id}
            key={index}
            className={`${
              darkMode ? "bg-gray-800 text-white shadow-gray-700" : "bg-gray-300 text-black shadow-gray-500"
            } shadow-md m-3 p-4 rounded flex flex-col justify-between`}
          >
            <h1 className="font-bold text-sm md:text-lg">{entry.title}</h1>
            <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
            <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    deleteEntry(entry.id as string);
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700"
                >
                  ✖
                </button>
                <button
                  onClick={() => {
                    navigate(`/edit/${entry.id}`, { replace: true });
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700"
                >
                  🖊
                </button>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                  <label className="font-semibold mt-2 mb-1">Created at:</label>
                  <time className="text-sm md:text-lg">
                    {new Date(entry.created_at.toString()).toLocaleDateString()}
                  </time>
                </div>
                <div className="flex flex-row justify-between">
                  <label className="font-semibold mt-2 mb-1">Scheduled at:</label>
                  <time className="text-sm md:text-lg">
                    {new Date(entry.schedule_at.toString()).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </section>
  );
}
