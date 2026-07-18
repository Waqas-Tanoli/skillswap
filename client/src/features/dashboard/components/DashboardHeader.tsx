import type { DashboardUser } from "../types";

type Props = {
  user: DashboardUser;
};

export default function DashboardHeader({
  user,
}: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        Welcome back, {user.username}
      </h1>

      <p className="mt-2 text-gray-500">
        Ready for your next skill exchange?
      </p>
    </div>
  );
}