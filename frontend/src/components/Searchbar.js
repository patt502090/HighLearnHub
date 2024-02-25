import React, { useState } from "react";
import { Modal, ModalHeader } from "flowbite-react";

function Searchbar(props) {
  const [showSubjectFilterModal, setShowSubjectFilterModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showingItem, setShowingItem] = useState("");
  const data = props.data.map((e) => ({
    ...e,
    title: e.title.toLowerCase(),
    common_name: e.title,
  }));

  const handleShowing = (e) => {
    console.log(data);
    if (!e) {
      setShowingItem(null);
    } else {
      const item = data
        .filter((value) => value.title.includes(e))
        .map((value) => (
          <li>
            <a
              href={`/course/${value.id}`}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {value.common_name}
            </a>
          </li>
        ));

      setShowingItem(item);
      console.log(showingItem);
    }
  };

  const handleSearchInput = (e) => {
    const data = e.toLowerCase();
    handleShowing(data);
  };

  return (
    <>
      <body className="bg-gray-300">
        <div className="container mx-auto flex justify-center items-center h-30 p-4 relative">
          <button
            type="button"
            className="flex text-black border-none justify-center font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={() => setShowSubjectFilterModal(true)}
          >
            <svg
              className="w-6 h-6 text-black dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              onClick={() => setShowSubjectFilterModal(false)}
            >
              <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
            </svg>
            ฝากเเก้หน่อยเเก้ไม่เป็นอ่ะ
          </button>
          <form className="flex items-center justify-center relative">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <svg
                  className="w-6 h-6 text-black dark:text-white " style={{ marginLeft: '200px' }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => setShowSubjectFilterModal(false)}
          
                >
                  <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="w-64 p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Courses"
                required
                onChange={(e) => handleSearchInput(e.target.value)}
                onClick={() => setShowSubjectFilterModal(false)}
              />
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 absolute top-full left-0 dark:bg-gray-700"
              >
                {showingItem ? (
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {showingItem}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </form>
        </div>
      </body>

      <Modal
        show={showSubjectFilterModal}
        size="md"
        onClose={() => setShowSubjectFilterModal(false)}
        popup
      >
        <ModalHeader>Filter</ModalHeader>
        <Modal.Body>
          <form action="" class="flex border-t border-gray-200 lg:border-t-0">
            <fieldset class="w-full">
              <legend class="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                Type
              </legend>

              <div class="space-y-2 px-5 py-6">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    name="type[New]"
                    class="h-5 w-5 rounded border-gray-300"
                  />
                  <label class="ml-3 text-sm font-medium">คณิต</label>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    name="type[Used]"
                    class="h-5 w-5 rounded border-gray-300"
                  />
                  <label class="ml-3 text-sm font-medium">ฟิสิกส์</label>
                </div>

                <div class="flex items-center">
                  <input
                    type="checkbox"
                    name="type[Branded]"
                    class="h-5 w-5 rounded border-gray-300"
                  />

                  <label class="ml-3 text-sm font-medium">คอม</label>
                </div>

                <div class="pt-2">
                  <button type="button" class="text-xs text-gray-500 underline">
                    Reset Type
                  </button>
                </div>
              </div>
            </fieldset>

            <fieldset class="w-full">
              <legend class="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                Price
              </legend>

              <div class="space-y-2 px-5 py-6">
                <div class="flex items-center">
                  <input
                    type="radio"
                    name="Price"
                    class="h-5 w-5 rounded border-gray-300"
                  />
                  <label class="ml-3 text-sm font-medium">0-1000</label>
                </div>

                <div class="flex items-center">
                  <input
                    type="radio"
                    name="Price"
                    class="h-5 w-5 rounded border-gray-300"
                  />

                  <label class="ml-3 text-sm font-medium">1000-2000</label>
                </div>

                <div class="flex items-center">
                  <input
                    type="radio"
                    name="Price"
                    class="h-5 w-5 rounded border-gray-300"
                  />

                  <label class="ml-3 text-sm font-medium">2000-3000</label>
                </div>

                <div class="pt-2">
                  <button type="button" class="text-xs text-gray-500 underline">
                    Reset Price
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
          <div class="">
            <div class="flex justify-between border-t border-gray-200 px-5 py-3">
              <button
                name="reset"
                type="button"
                class="rounded text-xs font-medium text-gray-600 underline"
              >
                Reset All
              </button>

              <button
                name="commit"
                type="button"
                class="rounded bg-blue-600 px-5 py-3 text-xs font-medium text-white active:scale-95"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Searchbar;
