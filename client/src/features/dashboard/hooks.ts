import { useEffect, useState } from "react";
import { getDashboard } from "./api";
import type { DashboardData } from "./types";
import { getErrorMessage } from "../../utils/getErrorMessage";

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getDashboard();

        setData(result);
      } catch (err: unknown) {
        setError(
          getErrorMessage(err, "Failed to load dashboard")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return {
    data,
    loading,
    error,
  };
};