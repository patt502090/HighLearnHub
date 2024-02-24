import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function ApprovePaymentPage() {
  return (
    <>
      <Navbar />

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                User name
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Slip
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td class="px-6 py-4">John</td>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >สรุปเนื้อหาติวคอร์ส</th>
              <td class="px-6 py-4">2d ago</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">Files</td>
              <td class="px-6 py-4">
                <a class="font-medium text-red-600 dark:text-red-500 hover:underline">
                  delete
                </a>
              </td>
              <td class="px-6 py-4">
                <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Approve
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
