import { useQuery } from "@tanstack/react-query";
import { currentUserQueryOptions } from "../auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const currentUserQuery = useQuery(currentUserQueryOptions);

  const user = currentUserQuery?.data?.user;

  return (
    <div>
      <h1 className="text-center">Profile</h1>
    <div>
    {currentUserQuery.error ? (
        <div>{currentUserQuery.error.message}</div>
      ) : currentUserQuery.isPending ? (
        <div className="flex flex-col max-w-96 m-auto animate-pulse">
          Getting User ....
        </div>
      ) : (
        <div>
          <div className="flex flex-col max-w-96 m-auto">{user?.email}</div>
          <div className="flex flex-col max-w-96 m-auto">
            {user?.given_name}</div>
          <button className=" flex flex-col max-w-96 m-auto text-center">
          <a href="/api/logout" className="flex flex-col max-w-96 m-auto text-center">Logout</a>
          </button>
      
        </div>
      )}
    </div>
    </div>
  );
}
