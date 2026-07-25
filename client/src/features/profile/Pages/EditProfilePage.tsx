import { useEffect } from "react";

import DashboardLayout from "../../../layouts/DashboardLayout";
import { useProfileStore } from "../../../store/profileStore";
import ProfileForm from "../Components/ProfileForm";

export default function EditProfilePage() {
  const {
    profile,

    loading,

    fetchProfile,

    saveProfile,
  } = useProfileStore();

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [fetchProfile, profile]);

  if (!profile) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-8 text-2xl font-bold">Edit Profile</h1>

        <ProfileForm
          profile={profile}
          loading={loading}
          onSubmit={saveProfile}
        />
      </div>
    </DashboardLayout>
  );
}
