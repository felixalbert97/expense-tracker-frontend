"use client";

import { useState } from "react";

export default function ExpenseForm({ onExpenseAdded }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EXPENSE");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Verhindert Seitenreload

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
      onExpenseAdded(newExpense); // Callback für Parent Component

      // Formular zurücksetzen
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      setType("EXPENSE");
    } catch (error) {
      console.error(error);
      alert("Error creating expense");
    }
  };

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
        Add Expense
      </button>
    </form>
  );
}