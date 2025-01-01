import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function ProfileLayout({open,setOpen}) {

  return (
    <>
    
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500/75 transition-opacity duration-500 ease-in-out">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
            {/* Modal Content */}
            <div className="flex justify-between items-center px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-900">Panel title</h3>
              <button
                type="button"
                onClick={()=>setOpen(false)}
                className="text-gray-300 hover:text-gray-700 focus:outline-none"
              >
                <CloseIcon className="text-2xl" />
              </button>
            </div>
            <div className="p-6">
              {/* Your content goes here */}
              <p>Content goes here...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
