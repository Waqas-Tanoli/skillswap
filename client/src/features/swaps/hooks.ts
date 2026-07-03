import { useEffect, useState, useCallback } from "react";

import { getUserSwaps } from "./api";
import type { Swap } from "./types";

export const useSwaps = () => {
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSwaps = useCallback(async () => {
    try {
      const data = await getUserSwaps();

      setSwaps(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSwaps();
  }, [fetchSwaps]);

  return {
    swaps,
    loading,
    refetch: fetchSwaps,
  };
};