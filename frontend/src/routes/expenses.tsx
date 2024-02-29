import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/expenses")({
  component: AllExpenses,
});

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};
type ExpenseList = {
  expenses: Expense[];
};

export async function getAllExpenses() {
  const res = await fetch("/api/expenses");
  const json: ExpenseList = await res.json();
  return json;
}

function AllExpenses() {
  const allExpensesQuery = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });

  return (
    <div className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
      {allExpensesQuery.error ? (
        <div>{allExpensesQuery.error.message}</div>
      ) : allExpensesQuery.isPending ? (
        <div className="flex flex-col max-w-96 m-auto animate-pulse">
          All Expenses...
        </div>
      ) : (
        <div className="flex flex-col max-w-96 m-auto">
          <h2 className="text-xl pt-6"> all expenses</h2>
          {allExpensesQuery.data?.expenses?.map((expense) => (
            <div key={expense.id} className="flex justify-between">
              <div>{expense.title}</div>
              <div>{expense.amount}</div>
              <div>{expense.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
