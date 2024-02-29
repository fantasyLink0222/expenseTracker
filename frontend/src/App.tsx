import { useEffect, useState } from "react";

function App() {
  const [totalSpent, setTotaSpent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTotalExpenses() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch("/api/expenses/total-amount");
        const json = await res.json();
        setTotaSpent(json.total);
      } catch (error) {
        setError("There was an error. try again");
      }
      setIsLoading(false);
    }
    getTotalExpenses();
  }, []);

  return (
    <div className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-center">Expenses</h1>
      {error ? (
        <div>{error}</div>
      ) : isLoading ? (
        <div className="flex flex-col max-w-96 m-auto animate-pulse">
          Total Spent ...
        </div>
      ) : (
        <div className="flex flex-col max-w-96 m-auto">
          Total Spent {totalSpent}
        </div>
      )}
    </div>
  );
}

export default App;