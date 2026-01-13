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
    <ul className="space-y-2">
      {expenses.map((expense) => {
        const isEditing = editingId === expense.id;
        const sign = expense.type === "EXPENSE" ? "-" : "+";

        return (
          <li key={expense.id} className="border p-2 rounded">
            {isEditing ? (
              <EditRow
                expense={expense}
                onSave={onSaveEdit}
                onCancel={onCancelEdit}
              />
            ) : (
              <DisplayRow
                expense={expense}
                sign={sign}
                onEdit={onStartEdit}
                onDelete={onDeleteExpense}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function DisplayRow({ expense, sign, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center">
      <span>
        {expense.date} – {expense.category}
      </span>

      <span className="flex gap-4 items-center">
        <span>
          {sign} {expense.amount} €
        </span>

        <button onClick={() => onEdit(expense.id)}>Edit</button>
        <button onClick={() => onDelete(expense.id)}>Delete</button>
      </span>
    </div>
  );
}

function EditRow({ expense, onSave, onCancel }) {
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);

  const handleSave = () => {
    onSave({
      ...expense,
      amount: parseFloat(amount),
      category,
    });
  };

  return (
    <div className="flex gap-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
