import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full bg-[#1e293b] py-4 flex justify-center gap-8 text-lg font-semibold shadow-md'>
        <NavLink 
          to="/"
          className={({ isActive }) => 
            isActive 
              ? "text-[#3b82f6] transition-colors" 
              : "text-white hover:text-blue-400 transition-colors"
          }
        >
            Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) => 
            isActive 
              ? "text-[#3b82f6] transition-colors" 
              : "text-white hover:text-blue-400 transition-colors"
          }
        >
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar