import ExpenseList from "./components/ExpenseList";

export default function Home() {
  return (
    <main className="p-4">
      <h1>Expense Tracker</h1>
      <ExpenseList />
    </main>
  );
}
