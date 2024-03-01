import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});
type ExpenseTotal = {
  total: number;
};

export async function getTotalExpenses() {
  const res = await fetch("/api/expenses/total-amount");
  const json: ExpenseTotal = await res.json();
  return json;
}

function HomePage() {
  const totalAmountQuery = useQuery({
    queryKey: ["total-amount"],
    queryFn: getTotalExpenses,
  });

  return (
    <div className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-center">Expenses</h1>
      {totalAmountQuery.error ? (
        <div>{totalAmountQuery.error.message}</div>
      ) : totalAmountQuery.isPending ? (
        <div className="flex flex-col max-w-96 m-auto animate-pulse">
          Total Spent ...
        </div>
      ) : (
        <div className="flex flex-col max-w-96 m-auto">
          Total Spent {totalAmountQuery.data.total}
        </div>
      )}
    </div>
  );
}
