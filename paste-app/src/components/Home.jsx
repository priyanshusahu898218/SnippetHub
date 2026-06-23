import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);
    
    useEffect(() => {
        if(pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }           
    }, [pasteId, allPastes])

    function createPaste() {
        // --- NEW VALIDATION LOGIC (ONLY FOR CREATE) ---
        if (!pasteId && (!title.trim() || !value.trim())) {
            toast.error("Please write something! Title and content cannot be empty.");
            return; 
        }
        // ----------------------------------------------

        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if(pasteId){
            dispatch(updateToPastes(paste));
            toast.success("Paste updated successfully");
        }
        else{
            dispatch(addToPastes(paste));
            toast.success("Paste created successfully");
        }
        
        setTitle('');
        setValue('');
        setSearchParams({});
    }
  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 mt-10">
        {/* Input & Button Tray Container */}
        <div className='w-[810px] flex gap-4 justify-between items-center mb-6'>
        <input 
            className='w-full flex-1 p-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
            type="text" 
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <button
            onClick={createPaste}
            className="bg-blue-600 text-black px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-all shadow-sm whitespace-nowrap"
        >
            {
                pasteId ? "Update My Paste" : "Create My Paste"
            }
        </button>
        </div>

        {/* Editor Mock Container matching the windowed UI */}
        <div className='border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white'>
            {/* Top Mock Window Bar with Dots & Copy Icon */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              </div>
              
              {/* Connected Crisp Copy Icon Button */}
              <button 
                onClick={() => {
                    if (value) {
                        navigator.clipboard.writeText(value);
                        toast.success("Copied to clipboard");
                    } else {
                        toast.error("Nothing to copy!");
                    }
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy code"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
              </button>
            </div>

            {/* Input Text Area block */}
            <textarea
                className='w-full p-4 resize-none focus:outline-none text-gray-700 bg-white'
                value={value}
                placeholder='Write Your Content Here....'
                onChange={(e) => setValue(e.target.value)}
                rows={15}
            />
        </div>
    </div>
  )
}

export default Home;