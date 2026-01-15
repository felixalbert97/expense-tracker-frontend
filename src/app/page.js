"use client";

import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import LoadingOverlay from "./LoadingOverlay";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses`);

      if (!response.ok) {
        throw new Error("Failed to load expenses");
      }

      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleDeleteExpense = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExpense = async (updatedExpense) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/expenses/${updatedExpense.id}`,
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 space-y-4 relative">
      {loading && <LoadingOverlay />}

      <h1 className="text-2xl font-bold">Expense Tracker</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {error}
        </div>
      )}

      <ExpenseList
        expenses={expenses}
        editingId={editingId}
        onStartEdit={setEditingId}
        onCancelEdit={() => setEditingId(null)}
        onSaveEdit={handleUpdateExpense}
        onDeleteExpense={handleDeleteExpense}
      />

      <ExpenseForm
        onExpenseAdded={handleExpenseAdded}
        setLoading={setLoading}
        setError={setError}
      />
    </main>
  );
}