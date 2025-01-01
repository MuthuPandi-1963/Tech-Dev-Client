import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function Profile({ open, setOpen }) {
  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0  "
            onClick={() => setOpenProfile(false)} // Close on clicking backdrop
          ></div>

          <div className="fixed inset-0 flex items-start justify-end z-50">
            <div className="w-64 bg-gray-200 h-full shadow-2xl transform transition-all   shadow-slate-900">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Profile Panel</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <p>Your content goes here.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
