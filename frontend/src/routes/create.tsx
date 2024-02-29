import { createFileRoute,useNavigate } from "@tanstack/react-router";

import { useState } from "react";


export const Route = createFileRoute("/create")({
  component: CreateExpense,
});

function CreateExpense() {
  

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const submitExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting expense", title, amount, date);

    await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, amount: Number(amount), date }),
    });

    navigate({to: '/expenses'});
  };

  return (
    <div className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="flex flex-col max-w-96 m-auto">
        <h2 className="text-xl pt-6"> create a new expense </h2>
        <form
          className="flex flex-col max-w-96 m-auto"
          onSubmit={submitExpense}
        >
          <label htmlFor="title">Title</label>
          <input
            className="text-black"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
          <label htmlFor="amount">Amount</label>
          <input
            className="text-black"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            name="amount"
          />
          <label htmlFor="date">Date</label>
          <input
            className="text-black"
            type="date"
            id="date"
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
