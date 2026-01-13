"use client";

export default function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return <p>No expenses yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="border p-2 rounded flex justify-between items-center"
        >
          <span>
            {expense.date} – {expense.category} ({expense.amount} €)
          </span>

          <button
            onClick={() => onDeleteExpense(expense.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}