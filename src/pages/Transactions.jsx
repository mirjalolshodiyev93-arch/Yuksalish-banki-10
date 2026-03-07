import React from "react";
import { transactions } from "../data/transactions";

export default function Transactions() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tranzaksiyalar</h1>

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left min-w-[500px] sm:min-w-full">
          <thead>
            <tr>
              <th className="py-2 sm:py-3 text-sm sm:text-base">Date</th>
              <th className="py-2 sm:py-3 text-sm sm:text-base">Client</th>
              <th className="py-2 sm:py-3 text-sm sm:text-base">Type</th>
              <th className="py-2 sm:py-3 text-sm sm:text-base">Amount</th>
              <th className="py-2 sm:py-3 text-sm sm:text-base">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t text-sm sm:text-base">
                <td className="py-2 sm:py-3">{t.date}</td>
                <td className="py-2 sm:py-3">{t.client}</td>
                <td className="py-2 sm:py-3">{t.type}</td>
                <td className="py-2 sm:py-3">{t.amount}</td>
                <td className={`py-2 sm:py-3 ${t.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}