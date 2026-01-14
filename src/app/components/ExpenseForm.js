"use client";

import { useState } from "react";

export default function ExpenseForm({ onExpenseAdded, setLoading, setError }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EXPENSE");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Verhindert Seitenreload
      setLoading(true);
      setError(null);

    const expense = {
      amount: parseFloat(amount),
      category,
      date,
      description,
      type
    };

    try {
      const response = await fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error("Failed to create expense");
      }

      const newExpense = await response.json();
      onExpenseAdded(newExpense);

      // Reset Form
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      setType("EXPENSE");
      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };
  /*
  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-2 border rounded">
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="border p-1 rounded w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border p-1 rounded w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border p-1 rounded w-full"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-1 rounded w-full"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-1 rounded w-full"
      >
        <option value="EXPENSE">Expense</option>
        <option value="INCOME">Income</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add
      </button>
    </form>
  ); */

  return (
    <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border rounded-lg bg-white shadow-sm"
    >
        <div className="grid grid-cols-2 gap-3">
        <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
        >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
        </select>
        </div>

        <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-text"
        />

        <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="border rounded px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
        type="submit"
        className="bg-blue-600 text-white px-10 py-2 rounded font-medium hover:bg-blue-700 transition cursor-pointer"
        >
        Add
        </button>
    </form>
  );
}