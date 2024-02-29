import { Hono } from "hono";
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun'
import { expensesRoute } from './routes/expenses';

// ...
const app = new Hono();

app.use("*", logger());

app.get("/api/me", (c) => {
    // cookies that we check
    // get user data using the cookies 
    let loggedIn = false;
    if (!loggedIn) {
      return c.json({ error: "Not logged in" }, 401);
    }
    let user = {
      email: "chuan@chuan,chuan",
      given_name: "chuan",
    }
  
    return c.json({ user });
  })

app.route("/api/expenses", expensesRoute)

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: './frontend/dist/index.html' }))



export default app;