"use client";

import { useEffect, useState } from "react";

export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/expenses")
            .then((response) => response.json())
            .then((data) => setExpenses(data))
            .catch((error) => console.error("Error fetching expenses:", error));
    }, []);

    return (
        <div>
            <h2>Expenses</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.date} - {expense.category}: {expense.amount} €
                    </li>
                ))}
            </ul>
        </div>
    );
}