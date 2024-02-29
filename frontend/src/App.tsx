import { useQuery } from "@tanstack/react-query";

type ExpenseTotal = {
  total: number;
};

async function getTotalExpenses() {
  const res = await fetch("/api/expenses/total-amount");
  const json: ExpenseTotal = await res.json();
  return json;
}

function App() {
  const query = useQuery({
    queryKey: ["total-amount"],
    queryFn: getTotalExpenses,
  });

  return (
    <div className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-center">Expenses</h1>
      {query.error ? (
        <div>{query.error.message}</div>
      ) : query.isPending ? (
        <div className="flex flex-col max-w-96 m-auto animate-pulse">
          Total Spent ...
        </div>
      ) : (
        <div className="flex flex-col max-w-96 m-auto">
          Total Spent {query.data.total}
        </div>
      )}
    </div>
  );
}

export default App;