interface Props {
  bio: string;
}

export default function AboutCard({
  bio,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">

        About

      </h2>

      <p className="mt-4 leading-7 text-slate-600">

        {bio || "No bio added yet."}

      </p>

    </div>
  );
}