import React from 'react'
import  { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste: ", paste);
  return (
    <div className="min-w-[1200px] max-w-[1200px] mx-auto p-6 mt-10">
        <div className='flex gap-4 justify-between items-center mb-6'>
        <input 
            className='flex-1 p-3 border border-gray-200 rounded-md shadow-sm bg-gray-50 text-gray-500 focus:outline-none'
            type="text" 
            placeholder='enter title here'
            value={paste.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button
            onClick={createPaste}
            
        >
            {

                pasteId ? "Update My Paste" : "Create My paste "
            }
        </button> */}
        </div>
        
        {/* Editor Mock Container matching the windowed UI */}
        <div className='border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white'>
            {/* Top Mock Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              </div>
              {/* Copy Button Icon */}
              <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125s-1.125-.504-1.125-1.125v-9.75c0-.621.504-1.125 1.125-1.125h3.375m1.5 1.5h9.75c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125s-1.125-.504-1.125-1.125V11.25c0-.621.504-1.125 1.125-1.125z" />
                </svg>
              </button>
            </div>

            <textarea
                className='w-full p-4 resize-none focus:outline-none bg-white text-gray-600'
                value={paste.content}
                placeholder='enter content here'
                disabled
                onChange={(e) => setValue(e.target.value)}
                rows={15}
            />
        </div>
    </div>
  )
}

export default ViewPaste