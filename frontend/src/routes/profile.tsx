import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: profile,
});

function profile() {
  return <div className="p-2">Hello from profile!</div>;
}
