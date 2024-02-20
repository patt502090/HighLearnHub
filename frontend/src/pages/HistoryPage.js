import React from "react";

function HistoryPage() {
  return (
    <html>
      <head>
          <link rel="stylesheet" href="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/css/main.d7f96858.css" />
      </head>
      <body >
          <div class="flex flex-col justify-center items-center h-[100vh] pt-4">
              <div class="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                  <div class="flex items-center justify-between rounded-t-3xl p-3 w-full">
                      <div class="text-lg font-bold text-navy-700 dark:text-white">
                          History
                      </div>
                      <button class="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
                          See all
                      </button>
                  </div>
                  <div class="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                      <div class="flex items-center gap-3">
                          <div class="flex h-16 w-16 items-center justify-center">
                              <img
                                  class="h-full w-full rounded-xl"
                                  src="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/media/Nft1.0fea34cca5aed6cad72b.png"
                                  alt=""
                              />
                          </div>
                          <div class="flex flex-col">
                              <h5 class="text-base font-bold text-navy-700 dark:text-white">
                                  Colorful Heaven
                              </h5>
                              <p class="mt-1 text-sm font-normal text-gray-600">
                                  Mark Benjamin
                              </p>
                          </div>
                      </div> 
                      <div class="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                          <div>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                          </div>
                          <div class="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                              <p>   </p>
                              2900<p class="ml-1">Bath</p>
                          </div>
                          <div class="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                              <p>5d</p>
                              <p class="ml-1">ago</p>
                          </div>
                      </div>
                  </div>
                  <div class="flex items-center justify-between rounded-t-3xl p-3 w-full">
                  </div>
                  <div class="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                      <div class="flex items-center gap-3">
                          <div class="flex h-16 w-16 items-center justify-center">
                              <img
                                  class="h-full w-full rounded-xl"
                                  src="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/media/Nft1.0fea34cca5aed6cad72b.png"
                                  alt=""
                              />
                          </div>
                          <div class="flex flex-col">
                              <h5 class="text-base font-bold text-navy-700 dark:text-white">
                                  Colorful Heaven
                              </h5>
                              <p class="mt-1 text-sm font-normal text-gray-600">
                                  Mark Benjamin
                              </p>
                          </div>
                      </div> 
                      <div class="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                          <div>
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                          </div>
                          <div class="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                              <p>   </p>
                              3299<p class="ml-1">Bath</p>
                          </div>
                          <div class="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                              <p>7d</p>
                              <p class="ml-1">ago</p>
                          </div>
                      </div>
                  </div>
              </div>  
              
          </div>
      </body>
    </html>
  );
}

export default HistoryPage;
