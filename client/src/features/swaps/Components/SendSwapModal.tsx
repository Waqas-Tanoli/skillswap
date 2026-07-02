import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Match } from "../../matches/types";

import { createSwapSchema } from "../schema";
import { sendSwapRequest } from "../api";
import { getErrorMessage } from "../../../utils/getErrorMessage";

type Props = {
  match: Match;
  open: boolean;
  onClose: () => void;
};

type FormData = {
  skillOffered: string;
  skillRequested: string;
  message?: string;
};

export default function SendSwapModal({
  match,
  open,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createSwapSchema),
  });

  if (!open) return null;

  const onSubmit = async (data: FormData) => {
    try {
      await sendSwapRequest({
        receiver: match.user._id,
        ...data,
      });

      alert("Swap request sent successfully!");

      onClose();
    } catch (error: unknown) {
      alert(
        getErrorMessage(error) ||
          "Failed to send request"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Send Swap Request
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Skill Offered */}
          <div>
            <label className="mb-2 block font-medium">
              Skill You Offer
            </label>

            <select
              {...register("skillOffered")}
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Select a skill
              </option>

              {match.user.skillsToLearn.map(
                (item) => (
                  <option
                    key={item._id}
                    value={item.skill._id}
                  >
                    {item.skill.name} (
                    {item.level})
                  </option>
                )
              )}
            </select>

            <p className="mt-1 text-sm text-red-500">
              {
                errors.skillOffered
                  ?.message
              }
            </p>
          </div>

          {/* Skill Requested */}
          <div>
            <label className="mb-2 block font-medium">
              Skill You Want
            </label>

            <select
              {...register("skillRequested")}
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Select a skill
              </option>

              {match.user.skillsToTeach.map(
                (item) => (
                  <option
                    key={item._id}
                    value={item.skill._id}
                  >
                    {item.skill.name} (
                    {item.level})
                  </option>
                )
              )}
            </select>

            <p className="mt-1 text-sm text-red-500">
              {
                errors.skillRequested
                  ?.message
              }
            </p>
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block font-medium">
              Message
            </label>

            <textarea
              rows={4}
              {...register("message")}
              placeholder="Introduce yourself and explain why you'd like to exchange skills..."
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting
                ? "Sending..."
                : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}