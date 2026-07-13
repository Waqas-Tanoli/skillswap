type Props = {
  name: string;
  skillOffered?: string;
  skillRequested?: string;
  trustScore?: number;
};

export default function ChatHeader({
  name,
  skillOffered,
  skillRequested,
  trustScore,
}: Props) {
  return (
    <div className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {name}
          </h2>

          <p className="text-sm text-gray-500">
            ⭐ Trust Score: {trustScore ?? 0}
          </p>
        </div>

        <div className="text-right text-sm text-gray-500">
          {skillOffered && (
            <p>
              Teaching:{" "}
              <span className="font-medium">
                {skillOffered}
              </span>
            </p>
          )}

          {skillRequested && (
            <p>
              Learning:{" "}
              <span className="font-medium">
                {skillRequested}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}