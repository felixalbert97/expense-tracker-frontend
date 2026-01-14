"use client";

import { useState } from "react";

export default function ExpenseList({
  expenses,
  editingId,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDeleteExpense,
}) {
  return (
    <ul className="space-y-3">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          isEditing={editingId === expense.id}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
          onDeleteExpense={onDeleteExpense}
        />
      ))}
    </ul>
  );
}

function ExpenseItem({
  expense,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDeleteExpense,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const sign = expense.type === "EXPENSE" ? "-" : "+";

  const shouldBeOpen = isOpen || isEditing;

  return (
    <li className="border rounded-lg p-4 bg-white shadow-sm space-y-3">
      {/* Header */}
        <div
            className={"flex justify-between items-center select-none" + " " + (isEditing ? "" : "cursor-pointer")}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            <div>
                <div className="font-medium">
                {expense.category}
                </div>
                <div className="text-sm text-gray-500">
                {expense.date}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span
                className={
                    expense.type === "EXPENSE"
                    ? "text-red-600 font-semibold"
                    : "text-green-600 font-semibold"
                }
                >
                {sign} {expense.amount} €
                </span>

                <button
                onClick={(e) => {
                    e.stopPropagation();
                    onStartEdit(expense.id);
                }}
                className={"text-blue-600" + " " + (isEditing ? "" : "hover:underline cursor-pointer")}
                >
                Edit
                </button>

                <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteExpense(expense.id);
                }}
                className="text-red-600 hover:underline cursor-pointer"
                >
                Delete
                </button>
            </div>
        </div>

      {/* Details */}
      {shouldBeOpen && (
        <div className="border-t pt-3 text-sm text-gray-700">
          {isEditing ? (
            <EditDetails
              expense={expense}
              onSave={onSaveEdit}
              onCancel={onCancelEdit}
            />
          ) : (
            <DisplayDetails expense={expense} />
          )}
        </div>
      )}
    </li>
  );
}


function DisplayDetails({ expense }) {
  return (
    <div className="space-y-1 text-sm text-gray-700">
      <div>
        <strong>Description:</strong>{" "}
        {expense.description || "—"}
      </div>
    </div>
  );
}

function EditDetails({ expense, onSave, onCancel }) {
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [description, setDescription] = useState(expense.description || "");
  const [date, setDate] = useState(expense.date);

  const handleSave = () => {
    onSave({
      ...expense,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-1 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-text"
        />
      </div>

      <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer" onClick={handleSave}>Save</button>
          <button className="text-gray-600 hover:underline cursor-pointer" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}