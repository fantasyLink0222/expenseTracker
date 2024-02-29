import { Hono } from "hono";
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun'
import { expenses as expensesTable } from "./db/schema/expenses";
import { db } from "./db";
import { desc, eq, sum } from "drizzle-orm"

// ...
const app = new Hono();

app.use("*", logger());

type Expense = {
  id: number,
  title: string,
  amount: number,
  date: string
}

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    const expenses = await db.select().from(expensesTable).orderBy(desc(expensesTable.createdAt));
    return c.json({ expenses: expenses });
  })
  .post("/", async (c) => {
    const body = await c.req.json();

    const dbExpense = await db
      .insert(expensesTable)
      .values({ ...body, userId: "fake-user-id" })
      .returning();

    return c.json({ expense: dbExpense }, 201);
  })
  .get("/total-amount", async (c) => {
    const result = await db
      .select({ value: sum(expensesTable.amount) })
      .from(expensesTable)
      .limit(1)
      .then((r) => r[0]);
    return c.json({ total: result.value });
  })

  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = await db.select().from(expensesTable).where(eq(expensesTable.id, id)).then((r) => r[0]);
    
    if (!expense) {
      return c.json({ error: "Expense not found" }, 404);
    }
    await db.delete(expensesTable).where(eq(expensesTable.id, id));
    return c.json({ expense: expense });
  });

app.route("/api/expenses", expensesRoute)

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: './frontend/dist/index.html' }))



export default app;