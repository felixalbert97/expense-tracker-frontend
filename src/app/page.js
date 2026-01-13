"use client";

import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { useState } from "react";

export default function Home() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleExpenseAdded = () => {
    setRefreshFlag(!refreshFlag); // Toggle, um ExpenseList neu zu rendern
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <ExpenseList key={refreshFlag} />
    </main>
  );
}