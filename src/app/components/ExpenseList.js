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
    <li className="border rounded p-3 bg-white">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-medium">
          {expense.date} • {expense.category}
        </span>

        <span className="flex gap-4 items-center">
          <span>
            {sign} {expense.amount} €
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartEdit(expense.id);
            }}
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteExpense(expense.id);
            }}
          >
            Delete
          </button>
        </span>
      </div>

      {/* Details */}
      {shouldBeOpen && (
        <div className="mt-3 border-t pt-3">
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
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-1 rounded w-24"
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-1 rounded w-full"
        />
      </div>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}