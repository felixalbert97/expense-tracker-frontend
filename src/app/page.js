"use client";

import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";

export default function Home() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>

      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <ExpenseList expenses={expenses} />
    </main>
  );
}