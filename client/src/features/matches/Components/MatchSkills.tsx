type Props = {
  title: string;
  skills: string[];
};

export default function MatchSkills({
  title,
  skills,
}: Props) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}