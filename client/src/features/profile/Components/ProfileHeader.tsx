import { CheckCircle, MapPin } from "lucide-react";
import type { UserProfile } from "../types";


interface Props {
  profile: UserProfile;
}

export default function ProfileHeader({
  profile,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <div className="flex flex-col items-center">

        <img
          src={
            profile.avatar ||
            "https://ui-avatars.com/api/?name=" +
              profile.username
          }
          alt={profile.username}
          className="h-28 w-28 rounded-full border-4 border-slate-200 object-cover"
        />

        <h1 className="mt-4 text-2xl font-bold">

          {profile.username}

        </h1>

        {profile.isVerified && (

          <div className="mt-2 flex items-center gap-1 text-blue-600">

            <CheckCircle size={18} />

            <span className="text-sm">

              Verified User

            </span>

          </div>

        )}

        <div className="mt-3 flex items-center gap-2 text-slate-500">

          <MapPin size={18} />

          {profile.location || "No location"}

        </div>

      </div>

    </div>
  );
}