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
  }, [profile, fetchProfile]);

  if (loading && !profile) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-slate-500">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-600">
              Profile not found
            </h2>
            <p className="mt-2 text-slate-500">
              We couldn't load your profile.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update your personal information, skills, and profile details.
          </p>
        </div>

        <ProfileForm
          profile={profile}
          loading={loading}
          onSubmit={saveProfile}
        />
      </div>
    </DashboardLayout>
  );
}