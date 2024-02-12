import React from 'react';
import { NavLink } from 'react-router-dom';
import SidebarWithBurgerMenu from "./Sidebar"

const Navbar = () => {
  return (
    <div>
      <header className="bg-gray-500">
        <div className="container mx-auto flex justify-between items-center p-4">
          <SidebarWithBurgerMenu></SidebarWithBurgerMenu>
          
          <div>
            <NavLink to="/login" className="text-white">Login</NavLink>
          </div>
        </div>
      </header>

      <header className="bg-gray-400">
        <div className="container mx-auto flex justify-between items-center p-4">
          
          <form className="flex items-center justify-center">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" id="default-search" className="block w-64 p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Courses" required />
            </div>
          </form>

        </div>
      </header>
    </div>
  );
};

export default Navbar;
