import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully");
  }

  const formatDate = (dateString) => {
    if (!dateString) return "October 20, 2024";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 mt-10">
      <input
        className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mb-6"
        type="search"
        placeholder="Search paste here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="border border-gray-200 rounded-md bg-white shadow-sm overflow-hidden">
        <h2 className="text-2xl font-bold p-5 border-b border-gray-200 text-gray-900">
          All Pastes
        </h2>

        <div className="p-5 flex flex-col gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => {
              return (
                <div 
                  className="border border-gray-200 rounded-lg p-5 flex flex-row justify-between items-start hover:shadow-sm transition-all bg-white gap-4" 
                  key={paste?._id}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize truncate">
                      {paste.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 bg-gray-50/50 p-3 rounded border border-gray-100 break-words">
                      {paste.content}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-6 min-w-[180px]">
                    <div className="flex items-center gap-1.5 border border-gray-200 rounded-md p-1 bg-white shadow-sm">
                      {/* Edit */}
                      <button 
                        onClick={() => navigate(`/?pasteId=${paste._id}`)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors"
                        title="Edit Paste"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </button>

                      {/* UPDATED: View Button with your custom Eye SVG */}
                      <button 
                        onClick={() => navigate(`/pastes/${paste?._id}`)}
                        className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                        title="View Paste"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button 
                        onClick={() => handleDelete(paste?._id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-50 rounded transition-colors"
                        title="Delete Paste"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>

                      {/* Copy Content with Clipboard SVG */}
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to clipboard");
                        }}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors"
                        title="Copy Content"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                      </button>

                      {/* Share */}
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/pastes/${paste?._id}`);
                          toast.success("Share link copied!");
                        }}
                        className="p-1.5 text-gray-500 hover:text-orange-500 hover:bg-gray-50 rounded transition-colors"
                        title="Share Paste"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186l5.348-2.674m-5.348 2.674l5.348 2.674m0 0a2.25 2.25 0 1 0 3.933 2.185 2.25 2.25 0 0 0-3.933-2.185m-.057-7.936a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center text-sm text-gray-400 gap-1 font-normal">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {formatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-gray-400 text-sm">
              No pastes found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;