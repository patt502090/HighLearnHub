import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarWithBurgerMenu from "./Sidebar"

const Navbar = () => {
  const [showingSearchingBar, setShowingSearchingBar] = useState(true);

  return (
    <div>
      <header className="bg-gray-500">
        <div className="container mx-auto flex justify-between items-center p-4">
          <SidebarWithBurgerMenu setShowingSearchingBar={setShowingSearchingBar} />
          <div className='container text-right'>
            <button className=" bg-black hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded-full">
              <NavLink to="/login" className="text-white">Login</NavLink>
            </button>
          </div>
        </div>
      </header>

      <body className="bg-gray-400">
        <div className="container mx-auto flex justify-center items-center h-30 p-4">
        <button type="button" className="flex text-black border-none justify-centerfont-medium rounded-full text-sm px-5 py-2.5 text-center"> 
          <svg class="w-6 h-6 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
          </svg>
          ตัวกรอง
          </button>
          {
            (showingSearchingBar) ?
              <form className="flex items-center justify-center">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" className="w-64 p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Courses" required />
                </div>
              </form>
              :
              <></>
          }

        </div>
      </body>
    </div>
  );
};

export default Navbar;
