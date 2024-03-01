import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return <div className=" justify-center text-4xl text-center pt-10">Hello from About!</div>;
}
