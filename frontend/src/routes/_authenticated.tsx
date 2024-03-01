import { createFileRoute, Outlet } from "@tanstack/react-router";
import { currentUserQueryOptions } from "../auth";

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;
    // make the request to the server to check if we're logged in
    try {
      const user = await queryClient.fetchQuery(currentUserQueryOptions);
      return { user };
    } catch (error) {
      return { user: null };
    }
  },
});

function Authenticated() {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
}

function Login() {
  return (
    <div className="flex flex-col max-w-96 m-auto text-center">
      <h1> You must Login</h1>
      <a href="/api/login">Login</a>
    </div>
  );
}