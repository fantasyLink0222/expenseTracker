import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from "@tanstack/react-query";
import {useState} from 'react';

export const Route = createFileRoute('/')({
    component: HomePage,
  })
type ExpenseTotal = {
  total: number;
};

type Expense = {
    id: number;
    title: string;
    amount: number;
    date: string;
    };
type ExpenseList = {
    expenses: Expense[];
    };

async function getTotalExpenses() {
  const res = await fetch("/api/expenses/total-amount");
  const json: ExpenseTotal = await res.json();
  return json;
}

async function getAllExpenses() {
    const res = await fetch("/api/expenses");
    const json: ExpenseList = await res.json();
    return json;
  }

async function createExpense(expense: Expense) {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  const json: Expense = await res.json();
  return json;
}

function HomePage() {
  const totalAmountQuery = useQuery({
    queryKey: ["total-amount"],
    queryFn: getTotalExpenses,
  });

  const allExpensesQuery = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const submitExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting expense",title, amount, date);

    await fetch("/api/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title, amount: Number(amount), date}),
        });

     totalAmountQuery.refetch();
     allExpensesQuery.refetch();
    
  }

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

     
    {allExpensesQuery.error ? (
        <div>{allExpensesQuery.error.message}</div>
    ) : allExpensesQuery.isPending ? (
        <div className="flex flex-col max-w-96 m-auto animate-pulse">
           All Expenses...
        </div>
    ) : (
        <div className="flex flex-col max-w-96 m-auto">
            <h2 className='text-xl pt-6'> all expenses</h2>
            {allExpensesQuery.data?.expenses?.map((expense) => (
                <div key={expense.id} className='flex justify-between'>
                    <div>{expense.title}</div>
                    <div>{expense.amount}</div>
                    <div>{expense.date}</div>
                </div>
            ))}
        </div>
    )}
   <div className="flex flex-col max-w-96 m-auto">
    <h2 className='text-xl pt-6'> create a new expense </h2>
    <form className='flex flex-col max-w-96 m-auto'
    onSubmit={submitExpense}>
         <label htmlFor="title">Title</label>
        <input className='text-black'
               type="text" 
               id="title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               name="title" />
        <label htmlFor="amount">Amount</label>
        <input className='text-black'
                type="number" 
               id='amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                name="amount"
               />
        <label htmlFor="date">Date</label>
        <input className='text-black'
                type="date" 
                id='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name="date"
               />
        <button type="submit">Create Expense</button>
    </form>
    </div>

    



    </div>
  );
}



