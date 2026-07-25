import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProfileStore } from "../../../store/profileStore";
import ProfileHeader from "../Components/ProfileHeader";
import ProfileStats from "../Components/ProfileStats";
import AboutCard from "../Components/AboutCard";
import SkillsCard from "../Components/SkillsCard";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function ProfilePage() {

  const {
    profile,
    loading,
    fetchProfile,
  } = useProfileStore();

  useEffect(() => {

    fetchProfile();

  }, [fetchProfile]);

  if (loading)
    return (
      <DashboardLayout>

        Loading...

      </DashboardLayout>
    );

  if (!profile)
    return (
      <DashboardLayout>

        User not found

      </DashboardLayout>
    );

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <ProfileHeader profile={profile} />

        <div className="flex justify-end">

          <Link
            to="/profile/edit"
            className="rounded-lg bg-slate-900 px-5 py-2 text-white"
          >

            Edit Profile

          </Link>

        </div>

        <ProfileStats profile={profile} />

        <AboutCard bio={profile.bio} />

        <div className="grid gap-6 lg:grid-cols-2">

          <SkillsCard
            title="Skills To Teach"
            skills={profile.skillsToTeach}
          />

          <SkillsCard
            title="Skills To Learn"
            skills={profile.skillsToLearn}
          />

        </div>

      </div>

    </DashboardLayout>
  );
}