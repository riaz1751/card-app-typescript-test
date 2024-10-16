import {useContext} from 'react'

export default function Settings() {
    return (
        <div className="settings-container">
          <h1 className="text-center font-semibold text-2xl m-5">Settings</h1>
          <div className="flex justify-center gap-4">
            <button 
              //onClick
              className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md"
            >
              Light Mode
            </button>
            <button 
              //onClick
              className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md"
            >
              Dark Mode
            </button>
          </div>
        </div>
      );
}