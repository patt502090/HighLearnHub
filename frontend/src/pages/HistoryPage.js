import React, { useState, useEffect } from "react";

function HistoryPage() {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchPaymentHistory()
      .then((data) => setPaymentHistory(data))
      .catch((error) => console.error("Error fetching payment history:", error));
  }, []);

  const fetchPaymentHistory = async () => {
    return [
      { id: 1, amount: 100, date: "2024-02-18" },
      { id: 2, amount: 200, date: "2024-02-15" },
      { id: 3, amount: 150, date: "2024-02-10" },
    ];
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">ประวัติการชำระเงิน</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">รหัสการชำระเงิน</th>
            <th className="border border-gray-300 px-4 py-2">จำนวนเงิน</th>
            <th className="border border-gray-300 px-4 py-2">วันที่</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{payment.id}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
