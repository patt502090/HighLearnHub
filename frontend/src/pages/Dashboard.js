import React from "react";
import { Helmet } from "react-helmet";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import backgroundImage from "../assets/background.png";

function Dashboard() {
  const viewData = {
    labels: [
      "21.02.2024",
      "22.02.2024",
      "23.02.2024",
      "24.02.2024",
      "25.02.2024",
      "26.02.2024",
      "27.02.2024",
    ],
    datasets: [
      {
        label: "Views this week",
        fill: true, 
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        data: [2102, 3512, 2411, 2315, 4622, 1951, 2544],
      },
      {
        label: "Views week ago",
        fill: true, 
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        data: [2512, 2322, 3011, 2315, 2992, 1951, 2544],
      },
    ],
  };
  
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Profit this week",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56],
      },
      {
        label: "Profit week ago",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [45, 50, 60, 70, 55],
      },
    ],
  };

  const salesData = {
    labels: [
      "21.02.2024",
      "22.02.2024",
      "23.02.2024",
      "24.02.2024",
      "25.02.2024",
      "26.02.2024",
      "27.02.2024",
    ],
    datasets: [
      {
        label: "Total Sales this week",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        data: [234, 155, 333, 321, 256, 105, 189],
      },
      {
        label: "Total Sales week ago",
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        data: [204, 175, 363, 121, 226, 153, 68],
      },
    ],
  };

  const adata = {
    labels: ["Desktop", "Tablet", "Mobile"],
    datasets: [
      {
        label: "Usage",
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
        hoverBackgroundColor: ["#43A047", "#FFA000", "#1E88E5"],
        data: [65, 34, 45],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>เเดชบอร์ด</title>
      </Helmet>
      <main className="bg-gray-100 min-h-screen">
        <nav className="bg-gray-800 text-white py-4">
          <div className="container mx-auto flex justify-end items-center px-4">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="icon-user text-gray-400 mr-2"></span> Admin
              Dashboard
            </h1>
          </div>
        </nav>
        <div
          className="container mx-auto mt-8"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1c0-.6.4-1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Total Users</h3>
              <div className="flex justify-between w-full">
                <p className="text-gray-700 ml-2">$3.456K</p>
                <p className="text-green-500 mr-2">0.95%</p>
                <svg
                  class="w-6 h-6 text-green-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4"
                  />
                </svg>{" "}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.8-3.1a5.5 5.5 0 0 0-2.8-6.3c.6-.4 1.3-.6 2-.6a3.5 3.5 0 0 1 .8 6.9Zm2.2 7.1h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1l-.5.8c1.9 1 3.1 3 3.1 5.2ZM4 7.5a3.5 3.5 0 0 1 5.5-2.9A5.5 5.5 0 0 0 6.7 11 3.5 3.5 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4c0 1.1.9 2 2 2h.5a6 6 0 0 1 3-5.2l-.4-.8Z"
                  clip-rule="evenodd"
                />
              </svg>

              <h3 className="text-lg font-semibold mb-2">Total Views</h3>
              <div className="flex justify-between w-full">
                <p className="text-gray-700 ml-2">45.2K</p>
                <p className="text-green-500 mr-2">0.43%</p>
                <svg
                  class="w-6 h-6 text-green-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4"
                  />
                </svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z"
                  clip-rule="evenodd"
                />
              </svg>

              <h3 className="text-lg font-semibold mb-2">Total Profit</h3>
              <div className="flex justify-between w-full">
                <p className="text-gray-700 ml-2">$2.450</p>
                <p className="text-green-500 mr-2">4.35%</p>
                <svg
                  class="w-6 h-6 text-green-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4"
                  />
                </svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4c0-.6.4-1 1-1h1.5c.5 0 .9.3 1 .8L7.9 6H19a1 1 0 0 1 1 1.2l-1.3 6a1 1 0 0 1-1 .8h-8l.2 1H17a3 3 0 1 1-2.8 2h-2.4a3 3 0 1 1-4-1.8L5.7 5H5a1 1 0 0 1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Total Products</h3>
              <div className="flex justify-between w-full">
                <p className="text-gray-700 ml-2">1182</p>
                <p className="text-red-500 mr-2">2.59%</p>
                <svg
                  class="w-6 h-6 text-red-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19V5m0 14-4-4m4 4 4-4"
                  />
                </svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Profit this week</h3>
              <div style={{ height: "300px" }}>
                <Bar
                  data={data}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
              <div style={{ height: "300px" }}>
                <Line
                  data={salesData}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Device Usage</h3>
              <div
                style={{ height: "300px", maxWidth: "400px", margin: "0 auto" }}
              >
                <Doughnut
                  data={adata}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Views Over Time</h3>
              <div style={{ height: "300px" }}>
                <Line
                  data={viewData}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
