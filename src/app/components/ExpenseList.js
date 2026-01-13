"use client";

export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p>No expenses yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="border p-2 rounded flex justify-between"
        >
          <span>
            {expense.date} – {expense.category}
          </span>
          <span>{expense.amount} €</span>
        </li>
      ))}
    </ul>
  );
}