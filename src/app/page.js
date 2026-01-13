"use client";

import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      // State aktualisieren → Expense entfernen
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting expense");
    }
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses/${updatedExpense.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const savedExpense = await response.json();

      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === savedExpense.id ? savedExpense : expense
        )
      );

      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Error updating expense");
    }
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>

      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <ExpenseList
        expenses={expenses}
        editingId={editingId}
        onStartEdit={setEditingId}
        onCancelEdit={() => setEditingId(null)}
        onSaveEdit={handleUpdateExpense}
        onDeleteExpense={handleDeleteExpense}
      />
    </main>
  );
}